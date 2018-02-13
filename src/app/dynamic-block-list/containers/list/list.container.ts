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

import * as fromDynamicBlockList from "../../reducers";

import { BlockUtilsService } from "../../services";

@Component({
  selector: "ct-list",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-list
      [blocks]="blocks$ | async"
      [loading]="loading$ | async"
      [error]="error$ | async"
      (reloadList)="reloadList()"
      [formValidity]="formValidity$ | async"
      [syncing]="syncRequired$ | async"
      (nextStep)="nextStep()"
      (reset)="reset()">
    </cp-list>`,
})
export class ListContainerComponent implements OnInit, OnDestroy {
  blocks$: Observable<Block[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  syncRequired$: Observable<boolean>;
  syncRequiredWithTimestamp$: Observable<{ syncRequired: boolean, timestamp: number }>;
  formValidity$: Observable<boolean>;
  editedBlocks: Observable<Block[]>;

  protected paramMapSubscription: Subscription;
  protected syncRequiredWithTimestampSubscription: Subscription;
  protected alertId: string;
  protected modalAlertResultSubscription: Subscription;

  constructor(protected store$: Store<fromDynamicBlockList.State>,
              protected route: ActivatedRoute,
              protected translate: TranslateService,
              protected logger: NGXLogger,
              protected blockUtils: BlockUtilsService) {
    this.blocks$ = this.store$.select(fromDynamicBlockList.getFetchedBlocksState);
    this.loading$ = this.store$.select(fromDynamicBlockList.getFetchLoadingState);
    this.error$ = this.store$.select(fromDynamicBlockList.getFetchErrorState);

    this.syncRequired$ = this.store$.select(fromDynamicBlockList.isSynchronizationRequiredState);
    this.syncRequiredWithTimestamp$ = this.store$.select(fromDynamicBlockList.isSynchronizationRequiredWithTimestampState);
  }

  ngOnInit(): void {
    this.subscribeToParamMap();
    this.subscribeToSyncing();
    this.subscribeToErrors();
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
        if (sync.syncRequired) {
          const payload = {
            ...this.getRouteParams(),
            blocks: blocks,
          };
          this.store$.dispatch(new list.UpdateBlocks(payload));
        }
      });
  }

  subscribeToErrors(): void {
    this.modalAlertResultSubscription = this.error$
      .subscribe((err) => {
        if (err) {
          this.translate.get([
            "CONTAINER.LIST.ALERT_BUTTON",
            "CONTAINER.LIST.ALERT_TITLE",
          ])
            .subscribe((translations: any) => {
              const modalAlert: ModalAlert = {
                id: this.alertId,
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
    return this.store$.select(fromDynamicBlockList.isSynchronizationRequiredState).map(requireSync => !requireSync);
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
    if (this.modalAlertResultSubscription) {
      this.modalAlertResultSubscription.unsubscribe();
    }
  }
}
