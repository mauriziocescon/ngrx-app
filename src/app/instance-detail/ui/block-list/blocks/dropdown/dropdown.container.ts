import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs';

import { BlockComponent } from '../../../../../shared';

import { DropdownBlock } from '../../../../models';

import { BlockListStoreService } from '../../../block-list-store.service';

import { DropdownComponent } from './dropdown.component';

@Component({
  selector: 'app-dropdown-ct',
  standalone: true,
  imports: [
    AsyncPipe,
    DropdownComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-dropdown-cp
      [block]="(block$ | async)!"
      (valueDidChange)="valueDidChange($event)">
    </app-dropdown-cp>`,
})
export class DropdownContainerComponent implements BlockComponent, OnInit, OnDestroy {
  @Input() blockId: string;

  block$: Observable<DropdownBlock | undefined>;

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
    const block: Update<DropdownBlock> = {
      id: this.blockId,
      changes: {
        value,
      },
    };
    this.blockListStore.updateBlock(block);
  }

  protected setupAsyncObs(): void {
    this.block$ = this.blockListStore.getBlockById(this.blockId) as Observable<DropdownBlock>;
  }
}
