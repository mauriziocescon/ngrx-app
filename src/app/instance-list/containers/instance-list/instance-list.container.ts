import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { ModalAlert, ModalStoreService } from '../../../core';

import { Instance } from '../../models';

import { InstanceListStoreService } from './instance-list-store.service';

@Component({
  selector: 'app-instance-list-ct',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    InstanceListStoreService,
  ],
  template: `
    <app-instance-list-cp
      [instances]="(instances$ | async)!"
      [loading]="(loading$ | async)!"
      [error]="(error$ | async)!"
      (paramsDidChange)="paramsDidChange($event)"
      (reloadList)="reloadList($event)">
    </app-instance-list-cp>
  `,
})
export class InstanceListContainerComponent implements OnInit, OnDestroy {
  instances$: Observable<Instance[] | undefined>;
  loading$: Observable<boolean>;
  error$: Observable<string | undefined>;

  protected alertId: string;
  protected modalAlertSubscription: Subscription;

  constructor(protected translate: TranslateService,
              protected modalStore: ModalStoreService,
              protected instanceListStore: InstanceListStoreService) {
    this.alertId = '1';
  }

  ngOnInit(): void {
    this.setupAsyncObs();

    this.instanceListStore.startEffects();
    this.reloadList({ textSearch: '' });
    this.subscribeToFetchErrors();
  }

  ngOnDestroy(): void {
    this.unsubscribeToModalConfirmerResult();
    this.instanceListStore.stopEffects();
  }

  paramsDidChange(params: { textSearch: string }): void {
    this.instanceListStore.loadInstances(params);
  }

  reloadList(params: { textSearch: string }): void {
    this.instanceListStore.loadInstances(params);
  }

  protected setupAsyncObs(): void {
    this.instances$ = this.instanceListStore.getInstances();
    this.loading$ = this.instanceListStore.isLoadingInstances();
    this.error$ = this.instanceListStore.getLoadingError();
  }

  protected subscribeToFetchErrors(): void {
    this.modalAlertSubscription = this.error$!
      .subscribe((err) => {
        if (err) {
          const modalAlert: ModalAlert = {
            id: this.alertId,
            title: this.translate.instant('CONTAINER.INSTANCE_LIST.ALERT_TITLE'),
            message: err,
            buttonLabel: this.translate.instant('CONTAINER.INSTANCE_LIST.ALERT_BUTTON'),
          };
          this.modalStore.showModalAlert(modalAlert);
        }
      });
  }

  protected unsubscribeToModalConfirmerResult(): void {
    this.modalAlertSubscription?.unsubscribe();
  }
}
