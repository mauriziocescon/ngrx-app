import { Component, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import {
  ModalConfirmer,
  ModalConfirmerResultType,
} from '../../../core/core.module';
import { BlockComponent, BlockType } from '../../../shared/shared.module';

import { CheckBoxConfirmerBlock } from '../../models';

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
      [loading]="loading$ | async"
      (valueDidChange)="valueDidChange($event)">
    </cp-check-box-confirmer>`,
})
export class CheckBoxConfirmerContainerComponent implements BlockComponent, OnDestroy {
  @Input() readonly blockId: string;

  block$: Observable<CheckBoxConfirmerBlock | undefined>;
  checkBoxConfirmerBlock: CheckBoxConfirmerBlock | undefined;

  loading$: Observable<boolean>;

  protected modalConfirmerResults$: Observable<{ [id: string]: ModalConfirmerResultType | undefined }>;
  protected modalConfirmerResultSubscription: Subscription;

  constructor(protected checkBoxConfirmerStore: CheckBoxConfirmerStoreService,
              protected translate: TranslateService) {
    this.block$ = this.checkBoxConfirmerStore.getCheckBoxConfirmerEntities()
      .pipe(
        map((entities: { [id: string]: CheckBoxConfirmerBlock }) => {
          return this.checkBoxConfirmerBlock = entities[this.blockId];
        }),
      );

    this.loading$ = this.checkBoxConfirmerStore.getCheckBoxConfirmerBlocksLoading()
      .pipe(
        map((blocksLoading: { [id: string]: boolean }) => {
          return blocksLoading[this.blockId];
        }),
      );

    this.modalConfirmerResults$ = this.checkBoxConfirmerStore.getModalConfirmerResults();
  }

  ngOnDestroy(): void {
    this.unsubscribeToModalConfirmerResult();
  }

  valueDidChange(value: boolean): void {
    if (value === true) {
      this.askForConfirmation();
    } else {
      this.dispatchValueDidChangeAction(value);
    }
  }

  protected dispatchValueDidChangeAction(value: boolean): void {
    if (this.checkBoxConfirmerBlock) {
      const block = {
        id: this.blockId,
        changes: {
          id: this.blockId,
          type: BlockType.CheckBoxConfirmer,
          order: this.checkBoxConfirmerBlock.order,
          label: this.checkBoxConfirmerBlock.label,
          value: value,
          description: this.checkBoxConfirmerBlock.description,
          required: this.checkBoxConfirmerBlock.required,
          disabled: this.checkBoxConfirmerBlock.disabled,
        },
      };
      this.checkBoxConfirmerStore.updateBlock(block);
    }
  }

  protected askForConfirmation(): void {
    this.subscribeToModalConfirmerResult();

    const modalConfirmer: ModalConfirmer = {
      id: this.blockId,
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
        const result = modalConfirmerResult[this.blockId];

        if (result) {
          this.checkBoxConfirmerStore.cleanModalConfirmer({ id: this.blockId });
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
