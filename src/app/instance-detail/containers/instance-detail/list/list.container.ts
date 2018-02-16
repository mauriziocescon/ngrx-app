import { Component, ChangeDetectionStrategy, OnInit, OnChanges, OnDestroy, Input, SimpleChanges } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/map";
import "rxjs/add/operator/withLatestFrom";

import { TranslateService } from "@ngx-translate/core";
import { NGXLogger } from "ngx-logger";

import { ModalAlert, modalAlertsActions } from "../../../../core/core.module";

import * as list from "../../../actions/list.actions";

import { Block, DynBlocksRouteParams } from "../../../models";

import * as fromInstanceDetail from "../../../reducers";

@Component({
  selector: "ct-list",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-list
      [blocks]="blocks$ | async"
      [loading]="fetchLoading$ | async"
      [fetchError]="fetchError$ | async"
      (reloadList)="reloadList()">
    </cp-list>`,
})
export class ListContainerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() routeParams: DynBlocksRouteParams;

  blocks$: Observable<Block[]>;
  fetchLoading$: Observable<boolean>;
  fetchError$: Observable<string>;

  protected mAlertFetchErrorId: string;

  protected modalAlertFetchErrorSubscription: Subscription;

  constructor(protected store$: Store<fromInstanceDetail.State>,
              protected translate: TranslateService,
              protected logger: NGXLogger) {
    this.blocks$ = this.store$.select(fromInstanceDetail.getFetchedBlocksState);
    this.fetchLoading$ = this.store$.select(fromInstanceDetail.getFetchLoadingState);
    this.fetchError$ = this.store$.select(fromInstanceDetail.getFetchErrorState);

    this.mAlertFetchErrorId = "1";
  }

  ngOnInit(): void {
    this.subscribeToFetchErrors();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.routeParams.module && this.routeParams.instance && this.routeParams.step) {
      this.store$.dispatch(new list.ClearBlocks());
      this.reloadList(this.routeParams.module, this.routeParams.instance, this.routeParams.step);
    }
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

  reloadList(module?: string, instance?: string, step?: string): void {
    const params = this.getRouteParams(module, instance, step);
    this.store$.dispatch(new list.FetchBlocks({module: params.module, instance: params.instance, step: params.step}));
  }

  protected getRouteParams(module?: string, instance?: string, step?: string): DynBlocksRouteParams {
    const mod = module || this.routeParams.module;
    const inst = instance || this.routeParams.instance;
    const st = step || this.routeParams.step;

    return {
      module: mod,
      instance: inst,
      step: st,
    };
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  protected unsubscribeAll(): void {
    if (this.modalAlertFetchErrorSubscription) {
      this.modalAlertFetchErrorSubscription.unsubscribe();
    }
  }
}
