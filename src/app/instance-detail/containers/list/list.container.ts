import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/map";
import "rxjs/add/operator/withLatestFrom";

import { TranslateService } from "@ngx-translate/core";
import { NGXLogger } from "ngx-logger";

import { ModalAlert, modalAlertsActions } from "../../../core/core.module";

import * as list from "../../actions/list.actions";

import { Block, DynBlocksRouteParams } from "../../models";

import * as fromInstanceDetail from "../../reducers";

import { BlockUtilsService } from "../../services";

@Component({
  selector: "ct-list",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-list
      [blocks]="blocks$ | async"
      [loading]="fetchLoading$ | async"
      [fetchError]="fetchError$ | async"
      (reloadList)="reloadList()"
      [formValidity]="formValidity$ | async"
      [syncing]="syncRequired$ | async"
      [syncError]="syncError$ | async"
      (nextStep)="nextStep()"
      (reset)="reset()">
    </cp-list>`,
})
export class ListContainerComponent implements OnInit, OnDestroy {
  blocks$: Observable<Block[]>;
  fetchLoading$: Observable<boolean>;
  fetchError$: Observable<string>;

  syncRequired$: Observable<boolean>;
  syncRequiredWithTimestamp$: Observable<{ syncRequired: boolean, timestamp: number }>;
  syncError$: Observable<string>;

  formValidity$: Observable<boolean>;
  editedBlocks: Observable<Block[]>;

  protected mAlertFetchErrorId: string;
  protected mAlertSyncErrorId: string;

  protected paramMapSubscription: Subscription;
  protected syncRequiredWithTimestampSubscription: Subscription;
  protected modalAlertFetchErrorSubscription: Subscription;
  protected modalAlertSyncErrorSubscription: Subscription;

  constructor(protected store$: Store<fromInstanceDetail.State>,
              protected route: ActivatedRoute,
              protected translate: TranslateService,
              protected logger: NGXLogger,
              protected blockUtils: BlockUtilsService) {
    this.blocks$ = this.store$.select(fromInstanceDetail.getFetchedBlocksState);
    this.fetchLoading$ = this.store$.select(fromInstanceDetail.getFetchLoadingState);
    this.fetchError$ = this.store$.select(fromInstanceDetail.getFetchErrorState);

    this.mAlertFetchErrorId = "1";
    this.mAlertSyncErrorId = "2";

    this.syncRequired$ = this.store$.select(fromInstanceDetail.isSynchronizationRequiredState);
    this.syncRequiredWithTimestamp$ = this.store$.select(fromInstanceDetail.isSynchronizationRequiredWithTimestampState);

    this.syncError$ = this.store$.select(fromInstanceDetail.getUpdateErrorState);
  }

  ngOnInit(): void {
    this.subscribeToParamMap();
    this.subscribeToSyncing();
    this.subscribeToFetchErrors();
    this.subscribeToSynchErrors();
  }

  protected subscribeToParamMap(): void {
    this.paramMapSubscription = this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        const params = this.getRouteParams();
        this.formValidity$ = this.blockUtils.getValiditySelector(params.module, params.instance, params.step);
        this.editedBlocks = this.blockUtils.getAllEditedBlocksSelector(params.module, params.instance, params.step);

        if (params.module && params.instance && params.step) {
          this.store$.dispatch(new list.ClearBlocks());
          this.reloadList(params.module, params.instance, params.step);
        }
      });
  }

  protected subscribeToSyncing(): void {
    this.syncRequiredWithTimestampSubscription = this.syncRequiredWithTimestamp$
      .withLatestFrom(this.editedBlocks)
      .subscribe(([sync, blocks]) => {
        if (sync.syncRequired === true) {
          const payload = {
            ...this.getRouteParams(),
            blocks: blocks,
          };
          this.store$.dispatch(new list.UpdateBlocks(payload));
        }
      });
  }

  subscribeToFetchErrors(): void {
    this.modalAlertFetchErrorSubscription = this.fetchError$
      .subscribe((err) => {
        if (err) {
          this.translate.get([
            "CONTAINER.LIST.ALERT_BUTTON",
            "CONTAINER.LIST.ALERT_TITLE",
          ])
            .subscribe((translations: any) => {
              const modalAlert: ModalAlert = {
                id: this.mAlertFetchErrorId,
                title: translations["CONTAINER.LIST.ALERT_TITLE"],
                message: err,
                buttonLabel: translations["CONTAINER.LIST.ALERT_BUTTON"],
              };
              this.store$.dispatch(new modalAlertsActions.ShowModalAlert({modal: modalAlert}));
            });
        }
      });
  }

  subscribeToSynchErrors(): void {
    this.modalAlertSyncErrorSubscription = this.syncError$
      .subscribe((err) => {
        if (err) {
          this.translate.get([
            "CONTAINER.LIST.ALERT_BUTTON",
            "CONTAINER.LIST.ALERT_TITLE",
          ])
            .subscribe((translations: any) => {
              const modalAlert: ModalAlert = {
                id: this.mAlertSyncErrorId,
                title: translations["CONTAINER.LIST.ALERT_TITLE"],
                message: err,
                buttonLabel: translations["CONTAINER.LIST.ALERT_BUTTON"],
              };
              this.store$.dispatch(new modalAlertsActions.ShowModalAlert({modal: modalAlert}));
            });
        }
      });
  }

  reloadList(module?: string, instance?: string, step?: string): void {
    const params = this.getRouteParams();
    const mod = module || params.module;
    const inst = instance || params.instance;
    const st = step || params.step;

    this.store$.dispatch(new list.FetchBlocks({module: mod, instance: inst, step: st}));
  }

  canDeactivate(): Observable<boolean> {
    return this.store$.select(fromInstanceDetail.isSynchronizationRequiredState).map(requireSync => !requireSync);
  }

  nextStep(): void {
    // dispatch action to move forward
    this.logger.log(`ListContainerComponent: save`);
  }

  reset(): void {
    // dispatch action to reset the store
    this.logger.log(`ListContainerComponent: reset`);
  }

  protected getRouteParams(module?: string, instance?: string, step?: string): DynBlocksRouteParams {
    const mod = module || this.route.snapshot.paramMap.get("module");
    const inst = instance || this.route.snapshot.paramMap.get("instance");
    const st = step || this.route.snapshot.paramMap.get("step");

    return {
      module: mod,
      instance: inst,
      step: st,
    };
  }

  ngOnDestroy(): void {
    this.unsubscribeToParamMap();
  }

  protected unsubscribeToParamMap(): void {
    if (this.paramMapSubscription) {
      this.paramMapSubscription.unsubscribe();
    }
    if (this.syncRequiredWithTimestampSubscription) {
      this.syncRequiredWithTimestampSubscription.unsubscribe();
    }
    if (this.modalAlertFetchErrorSubscription) {
      this.modalAlertFetchErrorSubscription.unsubscribe();
    }
    if (this.modalAlertSyncErrorSubscription) {
      this.modalAlertSyncErrorSubscription.unsubscribe();
    }
  }
}
