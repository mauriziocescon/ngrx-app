import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs';

import { BlockComponent } from '../../../../../shared';

import { CheckBoxBlock } from '../../../../models';

import { BlockListStoreService } from '../../../block-list-store.service';

import { CheckBoxComponent } from './check-box.component';

@Component({
  selector: 'app-check-box-ct',
  standalone: true,
  imports: [
    AsyncPipe,
    CheckBoxComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-check-box-cp
      [block]="(block$ | async)!"
      (valueDidChange)="valueDidChange($event)">
    </app-check-box-cp>`,
})
export class CheckBoxContainerComponent implements BlockComponent, OnInit, OnDestroy {
  @Input() blockId: string;

  block$: Observable<CheckBoxBlock | undefined>;

  protected blockListStore = inject(BlockListStoreService);

  ngOnInit(): void {
    this.setupAsyncObs();
  }

  ngOnDestroy(): void {
  }

  valueDidChange(value: boolean): void {
    this.updateBlock(value);
  }

  protected updateBlock(value: boolean): void {
    const block: Update<CheckBoxBlock> = {
      id: this.blockId,
      changes: {
        value,
      },
    };
    this.blockListStore.updateBlock(block);
  }

  protected setupAsyncObs(): void {
    this.block$ = this.blockListStore.getBlockById(this.blockId) as Observable<CheckBoxBlock>;
  }
}
