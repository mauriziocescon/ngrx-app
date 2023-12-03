import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Update } from '@ngrx/entity';

import { Observable, Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import {
  ModalConfirmer,
  ModalConfirmerResultType,
  ModalStoreService,
} from '../../../../../core';

import { BlockComponent } from '../../../../../shared';

import { CheckBoxConfirmerBlock } from '../../../../models';

import { BlockListStoreService } from '../../../block-list-store.service';

import { CheckBoxConfirmerComponent } from './check-box-confirmer.component';

@Component({
  selector: 'app-check-box-confirmer-ct',
  standalone: true,
  imports: [
    AsyncPipe,
    CheckBoxConfirmerComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-check-box-confirmer-cp
      [block]="(block$ | async)!"
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
              protected modalStore: ModalStoreService) {
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
    this.modalConfirmerResults$ = this.modalStore.getModalConfirmerResults();
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
    this.modalStore.showModalConfirmer(modalConfirmer);
  }

  protected subscribeToModalConfirmerResult(): void {
    this.unsubscribeToModalConfirmerResult();

    this.modalConfirmerResultSubscription = this.modalConfirmerResults$
      .subscribe((modalConfirmerResult: { [id: string]: ModalConfirmerResultType | undefined }) => {
        const result = modalConfirmerResult[this.blockId];

        if (result) {
          this.modalStore.cleanModalConfirmer({ id: this.blockId });
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
    this.modalConfirmerResultSubscription?.unsubscribe();
  }

  protected unsubscribeAllObs(): void {
    this.unsubscribeToModalConfirmerResult();
  }
}
