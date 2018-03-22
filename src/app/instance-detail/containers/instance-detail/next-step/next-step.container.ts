import { Component, ChangeDetectionStrategy, OnInit, OnChanges, OnDestroy, Input, SimpleChanges } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';

import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';

import { ModalAlert } from '../../../../core/core.module';

import { Block, InstanceParams } from '../../../models';

import { InstanceDetailIntegrationStoreService } from '../../../services';

import { NextStepStoreService } from './next-step-store.service';

@Component({
  selector: 'ct-next-step',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    NextStepStoreService,
  ],
  template: `
    <cp-next-step
      [formValidity]="formValidity$ | async"
      [syncing]="syncRequired$ | async"
      [syncError]="syncError$ | async"
      (nextStep)="nextStep()"
      (reset)="reset()" 
      (retrySync)="retrySync()">
    </cp-next-step>`,
})
export class NextStepContainerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() instanceParams: InstanceParams;

  syncRequired$: Observable<boolean>;
  syncRequiredWithTimestamp$: Observable<{ syncRequired: boolean, timestamp: number | undefined }>;
  syncError$: Observable<string | undefined>;

  formValidity$: Observable<boolean>;
  editedBlocks: Observable<Block[]>;

  protected mAlertSyncErrorId: string;

  protected syncRequiredWithTimestampSubscription: Subscription;
  protected modalAlertSyncErrorSubscription: Subscription;

  constructor(protected nextStepStore: NextStepStoreService,
              protected instanceDetailStore: InstanceDetailIntegrationStoreService,
              protected translate: TranslateService,
              protected logger: NGXLogger) {
    this.syncRequired$ = this.nextStepStore.getSyncRequired();
    this.syncRequiredWithTimestamp$ = this.nextStepStore.getSyncRequiredWithTimestamp();

    this.syncError$ = this.nextStepStore.getUpdateError();
  }

  ngOnInit(): void {
    this.subscribeToSyncing();
    this.subscribeToSynchErrors();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formValidity$ = this.instanceDetailStore.getValiditySelector();
    this.editedBlocks = this.instanceDetailStore.getAllEditedBlocksSelector();
  }

  protected subscribeToSyncing(): void {
    this.syncRequiredWithTimestampSubscription = this.syncRequiredWithTimestamp$
      .withLatestFrom(this.editedBlocks)
      .subscribe(([sync, blocks]) => {
        if (sync.syncRequired === true) {
          const payload = {
            ...this.instanceParams,
            blocks: blocks,
          };
          this.nextStepStore.dispatchSyncBlocks(payload);
        }
      });
  }

  protected subscribeToSynchErrors(): void {
    this.modalAlertSyncErrorSubscription = this.syncError$
      .subscribe((err) => {
        if (err) {
          this.translate.get([
            'CONTAINER.NEXT_STEP.ALERT_BUTTON',
            'CONTAINER.NEXT_STEP.ALERT_TITLE',
          ])
            .subscribe((translations: any) => {
              const modalAlert: ModalAlert = {
                id: this.mAlertSyncErrorId,
                title: translations['CONTAINER.NEXT_STEP.ALERT_TITLE'],
                message: err,
                buttonLabel: translations['CONTAINER.NEXT_STEP.ALERT_BUTTON'],
              };
              this.nextStepStore.dispatchShowModalAlert(modalAlert);
            });
        }
      });
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
    this.nextStepStore.dispatchSyncRequired();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  protected unsubscribeAll(): void {
    if (this.syncRequiredWithTimestampSubscription) {
      this.syncRequiredWithTimestampSubscription.unsubscribe();
    }
    if (this.modalAlertSyncErrorSubscription) {
      this.modalAlertSyncErrorSubscription.unsubscribe();
    }
  }
}
