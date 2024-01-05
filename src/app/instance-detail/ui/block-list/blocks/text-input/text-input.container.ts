import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { Observable } from 'rxjs';
import { Update } from '@ngrx/entity';

import { BlockComponent } from '../../../../../shared';

import { TextInputBlock } from '../../../../models';

import { BlockListStoreService } from '../../../block-list-store.service';

import { TextInputComponent } from './text-input.component';

@Component({
  selector: 'app-text-input-ct',
  standalone: true,
  imports: [
    AsyncPipe,
    TextInputComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-text-input-cp
      [block]="(block$ | async)!"
      (valueDidChange)="valueDidChange($event)">
    </app-text-input-cp>`,
})
export class TextInputContainerComponent implements BlockComponent, OnInit, OnDestroy {
  @Input() blockId: string;

  block$: Observable<TextInputBlock | undefined>;

  protected blockListStore = inject(BlockListStoreService);

  ngOnInit(): void {
    this.setupAsyncObs();
  }

  ngOnDestroy(): void {
  }

  valueDidChange(value: string): void {
    this.updateBlock(value);
  }

  protected updateBlock(value: string): void {
    const block: Update<TextInputBlock> = {
      id: this.blockId,
      changes: {
        value,
      },
    };
    this.blockListStore.updateBlock(block);
  }

  protected setupAsyncObs(): void {
    this.block$ = this.blockListStore.getBlockById(this.blockId) as Observable<TextInputBlock>;
  }
}
