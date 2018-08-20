import { Component, ChangeDetectionStrategy, OnInit, OnChanges, OnDestroy, Input, SimpleChanges } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import {
  withLatestFrom,
} from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';

import { ModalAlert } from '../../../../core/core.module';
import { Block } from '../../../../shared/shared.module';

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
  @Input() instance: string;

  syncRequired$: Observable<boolean>;
  syncError$: Observable<string | undefined>;

  formValidity$: Observable<boolean>;
  editedBlocks: Observable<Block[]>;

  protected mAlertSyncErrorId: string;

  protected modalAlertSyncErrorSubscription: Subscription;

  constructor(protected nextStepStore: NextStepStoreService,
              protected translate: TranslateService,
              protected logger: NGXLogger) {
    this.syncRequired$ = this.nextStepStore.getSyncRequired();

    this.syncError$ = this.nextStepStore.getUpdateError();
  }

  ngOnInit(): void {
    this.subscribeToSyncing();
    this.subscribeToSynchErrors();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // todo: replace
    // this.formValidity$ = this.instanceDetailStore.getValiditySelector();
    // this.editedBlocks = this.instanceDetailStore.getAllEditedBlocksSelector();
  }

  protected subscribeToSyncing(): void {
    // this.syncRequiredWithTimestampSubscription = this.syncRequiredWithTimestamp$
    //   .pipe(
    //     withLatestFrom(this.editedBlocks),
    //   )
    //   .subscribe(([sync, blocks]) => {
    //     if (sync.syncRequired === true) {
    //       const payload = {
    //         instance: this.instance,
    //         blocks: blocks,
    //       };
    //       this.nextStepStore.syncBlocks(payload);
    //     }
    //   });
  }

  protected subscribeToSynchErrors(): void {
    this.modalAlertSyncErrorSubscription = this.syncError$
      .subscribe((err) => {
        if (err) {
          const modalAlert: ModalAlert = {
            id: this.mAlertSyncErrorId,
            title: this.translate.instant('CONTAINER.NEXT_STEP.ALERT_TITLE'),
            message: err,
            buttonLabel: this.translate.instant('CONTAINER.NEXT_STEP.ALERT_BUTTON'),
          };
          this.nextStepStore.showModalAlert(modalAlert);
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
    this.nextStepStore.syncRequired();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  protected unsubscribeAll(): void {
    if (this.modalAlertSyncErrorSubscription) {
      this.modalAlertSyncErrorSubscription.unsubscribe();
    }
  }
}
