import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy } from '@angular/core';
import { Update } from '@ngrx/entity';

import { Observable, Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import {
  ModalConfirmer,
  ModalConfirmerResultType,
} from '../../../../../../core/core.module';

import { BlockComponent } from '../../../../../../shared/shared.module';

import { CheckBoxConfirmerBlock } from '../../../../../models';

import { BlockListStoreService } from '../../../block-list-store.service';
import { CoreStoreService } from '../../../core-store.service';

@Component({
  selector: 'app-check-box-confirmer-ct',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
  template: `
    <app-check-box-confirmer-cp
      [block]="block$ | async"
      (valueDidChange)="valueDidChange($event)">
    </app-check-box-confirmer-cp>`,
})
export class CheckBoxConfirmerContainerComponent implements BlockComponent, OnInit, OnDestroy {
  @Input() blockId: string;

  block$: Observable<CheckBoxConfirmerBlock | undefined>;

  protected modalConfirmerResults$: Observable<{ [id: string]: ModalConfirmerResultType | undefined }>;
  protected modalConfirmerResultSubscription: Subscription;

  constructor(protected translate: TranslateService,
              protected blockListStore: BlockListStoreService,
              protected coreStore: CoreStoreService) {
  }

  ngOnInit(): void {
    this.setupAsyncObs();
  }

  ngOnDestroy(): void {
    this.unsubscribeAllObs();
  }

  valueDidChange(value: boolean): void {
    if (value === true) {
      this.askForConfirmation();
    } else {
      this.updateBlock(value);
    }
  }

  protected updateBlock(value: boolean): void {
    const block: Update<CheckBoxConfirmerBlock> = {
      id: this.blockId,
      changes: {
        value,
      },
    };
    this.blockListStore.updateBlock(block);
  }

  protected setupAsyncObs(): void {
    this.block$ = this.blockListStore.getBlockById(this.blockId) as Observable<CheckBoxConfirmerBlock>;
    this.modalConfirmerResults$ = this.coreStore.getModalConfirmerResults();
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
    this.coreStore.showModalConfirmer(modalConfirmer);
  }

  protected subscribeToModalConfirmerResult(): void {
    this.unsubscribeToModalConfirmerResult();

    this.modalConfirmerResultSubscription = this.modalConfirmerResults$
      .subscribe((modalConfirmerResult: { [id: string]: ModalConfirmerResultType | undefined }) => {
        const result = modalConfirmerResult[this.blockId];

        if (result) {
          this.coreStore.cleanModalConfirmer({ id: this.blockId });
          this.unsubscribeToModalConfirmerResult();

          if (result === ModalConfirmerResultType.Positive) {
            this.updateBlock(true);
          } else {
            this.updateBlock(false);
          }
        }
      });
  }

  protected unsubscribeToModalConfirmerResult(): void {
    if (this.modalConfirmerResultSubscription) {
      this.modalConfirmerResultSubscription.unsubscribe();
    }
  }

  protected unsubscribeAllObs(): void {
    this.unsubscribeToModalConfirmerResult();
  }
}
