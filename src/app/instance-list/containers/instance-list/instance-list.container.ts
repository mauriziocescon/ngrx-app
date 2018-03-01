import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { TranslateService } from "@ngx-translate/core";

import { ModalAlert, modalAlertsActions } from "../../../core/core.module";

import * as instanceList from "../../actions/instance-list.actions";

import * as fromInstanceList from "../../reducers";

import { Instance } from "../../models";

@Component({
  selector: "ct-instance-list",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-instance-list
      [instances]="instances$ | async"
      [loading]="loading$ | async"
      [error]="error$ | async"
      (reloadList)="reloadList()"
      (goTo)="goTo($event)">
    </cp-instance-list>
  `,
})
export class InstanceListContainerComponent implements OnInit, OnDestroy {
  instances$: Observable<Instance[] | undefined>;
  loading$: Observable<boolean>;
  error$: Observable<string | undefined>;

  protected alertId: string;
  protected modalAlertSubscription: Subscription;

  constructor(protected store$: Store<fromInstanceList.State>,
              protected router: Router,
              protected translate: TranslateService) {
    this.instances$ = this.store$.select(fromInstanceList.getFetchedInstancesState);
    this.loading$ = this.store$.select(fromInstanceList.getFetchLoadingState);
    this.error$ = this.store$.select(fromInstanceList.getFetchErrorState);

    this.alertId = "1";
  }

  ngOnInit(): void {
    this.reloadList();
    this.subscribeToFetchErrors();
  }

  reloadList(): void {
    this.store$.dispatch(new instanceList.FetchInstances());
  }

  goTo(instance: Instance): void {
    this.router.navigate(["/instance-detail", instance.module, instance.instance, instance.step]);
  }

  subscribeToFetchErrors(): void {
    this.modalAlertSubscription = this.error$
      .subscribe((err) => {
        if (err) {
          this.translate.get([
            "CONTAINER.INSTANCE_LIST.ALERT_BUTTON",
            "CONTAINER.INSTANCE_LIST.ALERT_TITLE",
          ])
            .subscribe((translations: any) => {
              const modalAlert: ModalAlert = {
                id: this.alertId,
                title: translations["CONTAINER.INSTANCE_LIST.ALERT_TITLE"],
                message: err,
                buttonLabel: translations["CONTAINER.INSTANCE_LIST.ALERT_BUTTON"],
              };
              this.store$.dispatch(new modalAlertsActions.ShowModalAlert({modal: modalAlert}));
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeToModalConfirmerResult();
  }

  protected unsubscribeToModalConfirmerResult(): void {
    if (this.modalAlertSubscription) {
      this.modalAlertSubscription.unsubscribe();
    }
  }
}
