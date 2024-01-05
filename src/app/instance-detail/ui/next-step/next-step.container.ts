import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { AsyncPipe, Location } from '@angular/common';

import { Observable, Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';

import { ModalAlert, UIUtilitiesService } from '../../../core';

import { BlockListStoreService } from '../block-list-store.service';
import { SyncStoreService } from '../sync-store.service';

import { NextStepComponent } from './next-step.component';

@Component({
  selector: 'app-next-step-ct',
  standalone: true,
  imports: [
    AsyncPipe,
    NextStepComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-next-step-cp
      [nextStepBtnEnabled]="(nextStepBtnEnabled$ | async)!"
      [syncing]="(syncing$ | async)!"
      [syncError]="(syncError$ | async)!"
      (nextStep)="nextStep()"
      (resetSelections)="reset()"
      (retrySync)="retrySync()">
    </app-next-step-cp>`,
})
export class NextStepContainerComponent implements OnInit, OnDestroy {
  @Input() instanceId: string;

  nextStepBtnEnabled$: Observable<boolean>;
  syncing$: Observable<boolean>;
  syncError$: Observable<string | undefined>;

  protected mAlertSyncErrorId: string;

  protected modalAlertSyncErrorSubscription: Subscription;

  protected location = inject(Location);
  protected translate = inject(TranslateService);
  protected logger = inject(NGXLogger);
  protected blockListStore = inject(BlockListStoreService);
  protected uiUtilities = inject(UIUtilitiesService);
  protected syncStore = inject(SyncStoreService);

  constructor() {
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
    const modalAlert: ModalAlert = {
      id: this.mAlertSyncErrorId,
      title: this.translate.instant('CONTAINER.NEXT_STEP.ALERT_TITLE'),
      message: this.translate.instant('CONTAINER.NEXT_STEP.DONE'),
      buttonLabel: this.translate.instant('CONTAINER.NEXT_STEP.ALERT_BUTTON'),
    };
    this.uiUtilities.modalAlert(modalAlert);
    this.location.back();
  }

  reset(): void {
    this.location.back();
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
          this.uiUtilities.modalAlert(modalAlert);
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
    this.modalAlertSyncErrorSubscription?.unsubscribe();
  }
}
