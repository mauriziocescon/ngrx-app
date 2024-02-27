import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { AsyncPipe, Location } from '@angular/common';

import { Observable, Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { ModalAlert, UIUtilitiesService } from '../../../core';

import { InstanceDetailStoreService } from '../instance-detail-store.service';

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

  private mAlertSyncErrorId: string;

  private modalAlertSyncErrorSubscription: Subscription;

  private location = inject(Location);
  private translate = inject(TranslateService);
  private instanceDetailStore = inject(InstanceDetailStoreService);
  private uiUtilities = inject(UIUtilitiesService);

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
    this.instanceDetailStore.syncRequired();
  }

  private subscribeSynchErrors(): void {
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

  private setupAsyncObs(): void {
    this.nextStepBtnEnabled$ = this.instanceDetailStore.isNextStepEnable();
    this.syncing$ = this.instanceDetailStore.isSyncRequired();
    this.syncError$ = this.instanceDetailStore.getSyncError();
  }

  private subscribeAll(): void {
    this.subscribeSynchErrors();
  }

  private unsubscribeAll(): void {
    this.modalAlertSyncErrorSubscription?.unsubscribe();
  }
}
