import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy } from '@angular/core';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs';

import { BlockComponent } from '../../../../../../shared/shared.module';

import { DropdownBlock } from '../../../../../models';

import { BlockListStoreService } from '../../../block-list-store.service';

@Component({
  selector: 'ct-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
  ],
  template: `
    <cp-dropdown
      [block]="block$ | async"
      (valueDidChange)="valueDidChange($event)">
    </cp-dropdown>`,
})
export class DropdownContainerComponent implements BlockComponent, OnInit, OnDestroy {
  @Input() blockId: string;

  block$: Observable<DropdownBlock | undefined>;

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
    const block: Update<DropdownBlock> = {
      id: this.blockId,
      changes: {
        value: value,
      },
    };
    this.blockListStore.updateBlock(block);
  }

  protected setupAsyncObs(): void {
    this.block$ = this.blockListStore.getBlockById(this.blockId) as Observable<DropdownBlock>;
  }
}
