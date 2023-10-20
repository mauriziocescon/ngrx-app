import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';
import { Update } from '@ngrx/entity';

import { BlockComponent } from '../../../../../../shared';

import { TextInputBlock } from '../../../../../models';

import { BlockListStoreService } from '../../../block-list-store.service';

@Component({
  selector: 'app-text-input-ct',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
  template: `
    <app-text-input-cp
      [block]="(block$ | async)!"
      (valueDidChange)="valueDidChange($event)">
    </app-text-input-cp>`,
})
export class TextInputContainerComponent implements BlockComponent, OnInit, OnDestroy {
  @Input() blockId: string;

  block$: Observable<TextInputBlock | undefined>;

  constructor(protected blockListStore: BlockListStoreService) {
  }

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
