import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription, combineLatest } from 'rxjs';
import { withLatestFrom, map } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';

import { ModalAlert } from '../../../../core/core.module';

import { BlockListStoreService } from '../block-list-store.service';
import { CoreStoreService } from '../core-store.service';
import { SyncStoreService } from '../sync-store.service';

@Component({
  selector: 'ct-next-step',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-next-step
      [nextStepBtnEnabled]="nextStepBtnEnabled$ | async"
      [syncing]="syncing$ | async"
      [syncError]="syncError$ | async"
      (nextStep)="nextStep()"
      (reset)="reset()"
      (retrySync)="retrySync()">
    </cp-next-step>`,
})
export class NextStepContainerComponent implements OnInit, OnDestroy {
  @Input() instanceId: string;

  nextStepBtnEnabled$: Observable<boolean>;
  syncing$: Observable<boolean>;
  syncError$: Observable<string | undefined>;

  protected mAlertSyncErrorId: string;

  protected modalAlertSyncErrorSubscription: Subscription;

  constructor(protected translate: TranslateService,
              protected logger: NGXLogger,
              protected blockListStore: BlockListStoreService,
              protected coreStore: CoreStoreService,
              protected syncStore: SyncStoreService) {
    this.mAlertSyncErrorId = 'mAlertSyncErrorId';
  }

  ngOnInit(): void {
    this.setupAsyncObs();
    this.subscribeAll();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  nextStep(): void {
    // dispatch action to move forward
    alert(`NextStepContainerComponent: save`);
  }

  reset(): void {
    // dispatch action to reset the store
    alert(`NextStepContainerComponent: reset`);
  }

  retrySync(): void {
    this.syncStore.syncRequired();
  }

  protected subscribeSynchErrors(): void {
    this.modalAlertSyncErrorSubscription = this.syncError$
      .subscribe((err) => {
        if (err) {
          const modalAlert: ModalAlert = {
            id: this.mAlertSyncErrorId,
            title: this.translate.instant('CONTAINER.NEXT_STEP.ALERT_TITLE'),
            message: err,
            buttonLabel: this.translate.instant('CONTAINER.NEXT_STEP.ALERT_BUTTON'),
          };
          this.coreStore.showModalAlert(modalAlert);
        }
      });
  }

  protected setupAsyncObs(): void {
    this.nextStepBtnEnabled$ = this.blockListStore.isNextStepEnable();
    this.syncing$ = this.syncStore.isSyncRequired();
    this.syncError$ = this.blockListStore.getSyncError();
  }

  protected subscribeAll(): void {
    this.subscribeSynchErrors();
  }

  protected unsubscribeAll(): void {
    if (this.modalAlertSyncErrorSubscription) {
      this.modalAlertSyncErrorSubscription.unsubscribe();
    }
  }
}
