import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import {
  ModalConfirmer,
  ModalConfirmerResultType,
} from '../../../../core/core.module';
import { BlockComponent } from '../../../../shared/shared.module';

import { CheckBoxConfirmerBlock } from '../../../models';

import { CheckBoxConfirmerStoreService } from './check-box-confirmer-store.service';

@Component({
  selector: 'ct-check-box-confirmer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    CheckBoxConfirmerStoreService,
  ],
  template: `
    <cp-check-box-confirmer
      [block]="block$ | async"
      (valueDidChange)="valueDidChange($event)">
    </cp-check-box-confirmer>`,
})
export class CheckBoxConfirmerContainerComponent implements BlockComponent, OnInit, OnDestroy {
  @Input() readonly block: CheckBoxConfirmerBlock;

  block$: Observable<CheckBoxConfirmerBlock | undefined>;

  protected modalConfirmerResults$: Observable<{ [id: string]: ModalConfirmerResultType | undefined }>;
  protected modalConfirmerResultSubscription: Subscription;

  constructor(protected checkBoxConfirmerStore: CheckBoxConfirmerStoreService,
              protected translate: TranslateService) {
  }

  ngOnInit(): void {
    this.checkBoxConfirmerStore.addBlock(this.block);
    this.setupAsyncObs();

    this.modalConfirmerResults$ = this.checkBoxConfirmerStore.getModalConfirmerResults();
  }

  ngOnDestroy(): void {
    this.unsubscribeToModalConfirmerResult();
    this.checkBoxConfirmerStore.clearBlock(this.block.id);
  }

  valueDidChange(value: boolean): void {
    if (value === true) {
      this.askForConfirmation();
    } else {
      this.dispatchValueDidChangeAction(value);
    }
  }

  protected dispatchValueDidChangeAction(value: boolean): void {
    const block = {
      id: this.block.id,
      changes: {
        value: value,
      },
    };
    this.checkBoxConfirmerStore.updateBlock(block);
  }

  protected setupAsyncObs(): void {
    this.block$ = this.checkBoxConfirmerStore.getCheckBoxConfirmerById(this.block.id);
  }

  protected askForConfirmation(): void {
    this.subscribeToModalConfirmerResult();

    const modalConfirmer: ModalConfirmer = {
      id: this.block.id,
      title: this.translate.instant('CONTAINER.CHECK_BOX_CONFIRMER.CONFIRMATION_TITLE'),
      message: this.translate.instant('CONTAINER.CHECK_BOX_CONFIRMER.CONFIRMATION_MESSAGE'),
      yesButtonLabel: this.translate.instant('CONTAINER.CHECK_BOX_CONFIRMER.CONFIRMATION_YES_BUTTON'),
      noButtonLabel: this.translate.instant('CONTAINER.CHECK_BOX_CONFIRMER.CONFIRMATION_NO_BUTTON'),
    };
    this.checkBoxConfirmerStore.showModalConfirmer(modalConfirmer);
  }

  protected subscribeToModalConfirmerResult(): void {
    this.unsubscribeToModalConfirmerResult();

    this.modalConfirmerResultSubscription = this.modalConfirmerResults$
      .subscribe((modalConfirmerResult: { [id: string]: ModalConfirmerResultType | undefined }) => {
        const result = modalConfirmerResult[this.block.id];

        if (result) {
          this.checkBoxConfirmerStore.cleanModalConfirmer({ id: this.block.id });
          this.unsubscribeToModalConfirmerResult();

          if (result === ModalConfirmerResultType.Positive) {
            this.dispatchValueDidChangeAction(true);
          } else {
            this.dispatchValueDidChangeAction(false);
          }
        }
      });
  }

  protected unsubscribeToModalConfirmerResult(): void {
    if (this.modalConfirmerResultSubscription) {
      this.modalConfirmerResultSubscription.unsubscribe();
    }
  }
}
