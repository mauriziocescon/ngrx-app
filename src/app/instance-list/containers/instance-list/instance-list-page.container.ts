import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { ModalAlert, modalAlertsActions } from '../../../core/core.module';

import * as instanceList from '../../actions/instance-list.actions';

import * as fromInstanceList from '../../reducers';

import { Instance } from '../../models';

import { InstanceListStoreService } from './instance-list-page-store.service';

@Component({
  selector: 'ct-instance-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    InstanceListStoreService,
  ],
  template: `
    <cp-instance-list
      [instances]="instances$ | async"
      [loading]="loading$ | async"
      [error]="error$ | async"
      (paramsDidChange)="paramsDidChange($event)"
      (reloadList)="reloadList($event)"
      (goTo)="goTo($event)">
    </cp-instance-list>
  `,
})
export class InstanceListPageComponent implements OnInit, OnDestroy {
  instances$: Observable<Instance[] | undefined>;
  loading$: Observable<boolean>;
  error$: Observable<string | undefined>;

  protected alertId: string;
  protected modalAlertSubscription: Subscription;

  constructor(protected instanceListStore: InstanceListStoreService,
              protected router: Router,
              protected translate: TranslateService) {
    this.instances$ = this.instanceListStore.getFetchedInstances();
    this.loading$ = this.instanceListStore.getFetchLoading();
    this.error$ = this.instanceListStore.getFetchError();

    this.alertId = '1';
  }

  ngOnInit(): void {
    this.instanceListStore.startEffects();
    this.reloadList({ textSearch: '' });
    this.subscribeToFetchErrors();
  }

  paramsDidChange(params: { textSearch: string }): void {
    this.instanceListStore.fetchInstances(params);
  }

  reloadList(params: { textSearch: string }): void {
    this.instanceListStore.fetchInstances(params);
  }

  goTo(instance: Instance): void {
    this.router.navigate(['/instance-detail', instance.instance]);
  }

  subscribeToFetchErrors(): void {
    this.modalAlertSubscription = this.error$
      .subscribe((err) => {
        if (err) {
          const modalAlert: ModalAlert = {
            id: this.alertId,
            title: this.translate.instant('CONTAINER.INSTANCE_LIST.ALERT_TITLE'),
            message: err,
            buttonLabel: this.translate.instant('CONTAINER.INSTANCE_LIST.ALERT_BUTTON'),
          };
          this.instanceListStore.showModalAlert(modalAlert);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeToModalConfirmerResult();
    this.instanceListStore.stopEffects();
  }

  protected unsubscribeToModalConfirmerResult(): void {
    if (this.modalAlertSubscription) {
      this.modalAlertSubscription.unsubscribe();
    }
  }
}
