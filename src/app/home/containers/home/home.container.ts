import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { TranslateService } from "@ngx-translate/core";

import { ModalAlert, modalAlertsActions } from "../../../core/core.module";

import * as home from "../../actions/home.actions";

import * as fromHome from "../../reducers";

import { Instance } from "../../models";

@Component({
  selector: "ct-home",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-home
      [instances]="instances$ | async"
      [loading]="loading$ | async"
      [error]="error$ | async"
      (reloadList)="reloadList()"
      (goTo)="goTo($event)">
    </cp-home>
  `,
})
export class HomeContainerComponent implements OnInit, OnDestroy {
  instances$: Observable<Instance[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  protected alertId: string;
  protected modalAlertSubscription: Subscription;

  constructor(protected store$: Store<fromHome.State>,
              protected router: Router,
              protected translate: TranslateService) {
    this.instances$ = this.store$.select(fromHome.getFetchedInstancesState);
    this.loading$ = this.store$.select(fromHome.getFetchLoadingState);
    this.error$ = this.store$.select(fromHome.getFetchErrorState);

    this.alertId = "1";
  }

  ngOnInit(): void {
    this.reloadList();
    this.subscribeToFetchErrors();
  }

  reloadList(): void {
    this.store$.dispatch(new home.FetchInstances());
  }

  goTo(instance: Instance): void {
    this.router.navigate(["/dyn-block-list", instance.module, instance.instance, instance.step]);
  }

  subscribeToFetchErrors(): void {
    this.modalAlertSubscription = this.error$
      .subscribe((err) => {
        if (err) {
          this.translate.get([
            "CONTAINER.HOME.ALERT_BUTTON",
            "CONTAINER.HOME.ALERT_TITLE",
          ])
            .subscribe((translations: any) => {
              const modalAlert: ModalAlert = {
                id: this.alertId,
                title: translations["CONTAINER.HOME.ALERT_TITLE"],
                message: err,
                buttonLabel: translations["CONTAINER.HOME.ALERT_BUTTON"],
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
