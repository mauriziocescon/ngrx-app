import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Update } from '@ngrx/entity';

import { Observable, Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { ModalConfirmer, UIUtilitiesService } from '../../../../../core';

import { BlockComponent } from '../../../../../shared';

import { CheckBoxConfirmerBlock } from '../../../../models';

import { InstanceDetailStoreService } from '../../../instance-detail-store.service';

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

  protected modalConfirmerResultSubscription: Subscription;

  protected translate = inject(TranslateService);
  protected instanceDetailStore = inject(InstanceDetailStoreService);
  protected uiUtilities = inject(UIUtilitiesService);

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
    this.instanceDetailStore.updateBlock(block);
  }

  protected setupAsyncObs(): void {
    this.block$ = this.instanceDetailStore.getBlockById(this.blockId) as Observable<CheckBoxConfirmerBlock>;
  }

  protected askForConfirmation(): void {
    this.unsubscribeToModalConfirmerResult();

    const modalConfirmer: ModalConfirmer = {
      id: this.blockId,
      title: this.translate.instant('CONTAINER.CHECK_BOX_CONFIRMER.CONFIRMATION_TITLE'),
      message: this.translate.instant('CONTAINER.CHECK_BOX_CONFIRMER.CONFIRMATION_MESSAGE'),
      yesButtonLabel: this.translate.instant('CONTAINER.CHECK_BOX_CONFIRMER.CONFIRMATION_YES_BUTTON'),
      noButtonLabel: this.translate.instant('CONTAINER.CHECK_BOX_CONFIRMER.CONFIRMATION_NO_BUTTON'),
    };
    this.uiUtilities.modalConfirmer(modalConfirmer)
      .subscribe(result => {
        if (result === true) {
          this.updateBlock(true);
        } else {
          this.updateBlock(false);
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
