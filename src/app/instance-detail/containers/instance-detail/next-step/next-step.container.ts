import { Component, ChangeDetectionStrategy, OnInit, OnChanges, OnDestroy, Input, SimpleChanges } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/map";
import "rxjs/add/operator/withLatestFrom";

import { TranslateService } from "@ngx-translate/core";
import { NGXLogger } from "ngx-logger";

import { ModalAlert, modalAlertsActions } from "../../../../core/core.module";

import * as list from "../../../actions/list/list.actions";

import { Block, InstanceParams } from "../../../models";

import * as fromInstanceDetail from "../../../reducers";

import { BlockUtilsService } from "../../../services";

@Component({
  selector: "ct-next-step",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-next-step
      [formValidity]="formValidity$ | async"
      [syncing]="syncRequired$ | async"
      [syncError]="syncError$ | async"
      (nextStep)="nextStep()"
      (reset)="reset()">
    </cp-next-step>`,
})
export class NextStepContainerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() instanceParams: InstanceParams;

  syncRequired$: Observable<boolean>;
  syncRequiredWithTimestamp$: Observable<{ syncRequired: boolean, timestamp: number }>;
  syncError$: Observable<string>;

  formValidity$: Observable<boolean>;
  editedBlocks: Observable<Block[]>;

  protected mAlertSyncErrorId: string;

  protected syncRequiredWithTimestampSubscription: Subscription;
  protected modalAlertSyncErrorSubscription: Subscription;

  constructor(protected store$: Store<fromInstanceDetail.State>,
              protected translate: TranslateService,
              protected logger: NGXLogger,
              protected blockUtils: BlockUtilsService) {
    this.syncRequired$ = this.store$.select(fromInstanceDetail.isSynchronizationRequiredState);
    this.syncRequiredWithTimestamp$ = this.store$.select(fromInstanceDetail.isSynchronizationRequiredWithTimestampState);

    this.syncError$ = this.store$.select(fromInstanceDetail.getUpdateErrorState);
  }

  ngOnInit(): void {
    this.subscribeToSyncing();
    this.subscribeToSynchErrors();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.formValidity$ = this.blockUtils.getValiditySelector(this.instanceParams.module, this.instanceParams.instance, this.instanceParams.step);
    this.editedBlocks = this.blockUtils.getAllEditedBlocksSelector(this.instanceParams.module, this.instanceParams.instance, this.instanceParams.step);
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
          this.store$.dispatch(new list.UpdateBlocks(payload));
        }
      });
  }

  protected subscribeToSynchErrors(): void {
    this.modalAlertSyncErrorSubscription = this.syncError$
      .subscribe((err) => {
        if (err) {
          this.translate.get([
            "CONTAINER.NEXT_STEP.ALERT_BUTTON",
            "CONTAINER.NEXT_STEP.ALERT_TITLE",
          ])
            .subscribe((translations: any) => {
              const modalAlert: ModalAlert = {
                id: this.mAlertSyncErrorId,
                title: translations["CONTAINER.NEXT_STEP.ALERT_TITLE"],
                message: err,
                buttonLabel: translations["CONTAINER.NEXT_STEP.ALERT_BUTTON"],
              };
              this.store$.dispatch(new modalAlertsActions.ShowModalAlert({modal: modalAlert}));
            });
        }
      });
  }

  nextStep(): void {
    // dispatch action to move forward
    this.logger.log(`NextStepContainerComponent: save`);
  }

  reset(): void {
    // dispatch action to reset the store
    this.logger.log(`NextStepContainerComponent: reset`);
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
