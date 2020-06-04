import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { ModalAlert } from '../../../core/core.module';

import { Instance } from '../../models';

import { CoreStoreService } from './core-store.service';
import { EffectsStoreService } from './effects-store.service';
import { InstanceListStoreService } from './instance-list-store.service';

@Component({
  selector: 'app-instance-list-ct',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    CoreStoreService,
    EffectsStoreService,
    InstanceListStoreService,
  ],
  template: `
    <app-instance-list-cp
      [instances]="instances$ | async"
      [loading]="loading$ | async"
      [error]="error$ | async"
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
              protected coreStore: CoreStoreService,
              protected effectsStore: EffectsStoreService,
              protected instanceListStore: InstanceListStoreService) {
    this.alertId = '1';
  }

  ngOnInit(): void {
    this.setupAsyncObs();

    this.effectsStore.startEffects();
    this.reloadList({ textSearch: '' });
    this.subscribeToFetchErrors();
  }

  ngOnDestroy(): void {
    this.unsubscribeToModalConfirmerResult();
    this.effectsStore.stopEffects();
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
    this.modalAlertSubscription = this.error$
      .subscribe((err) => {
        if (err) {
          const modalAlert: ModalAlert = {
            id: this.alertId,
            title: this.translate.instant('CONTAINER.INSTANCE_LIST.ALERT_TITLE'),
            message: err,
            buttonLabel: this.translate.instant('CONTAINER.INSTANCE_LIST.ALERT_BUTTON'),
          };
          this.coreStore.showModalAlert(modalAlert);
        }
      });
  }

  protected unsubscribeToModalConfirmerResult(): void {
    if (this.modalAlertSubscription) {
      this.modalAlertSubscription.unsubscribe();
    }
  }
}
