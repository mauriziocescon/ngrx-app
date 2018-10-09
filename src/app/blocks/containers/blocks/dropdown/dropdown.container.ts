import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { BlockComponent } from '../../../../shared/shared.module';

import { DropdownBlock } from '../../../models';

import { DropdownStoreService } from './dropdown-store.service';

@Component({
  selector: 'ct-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DropdownStoreService,
  ],
  template: `
    <cp-dropdown
      [block]="block$ | async"
      (valueDidChange)="valueDidChange($event)">
    </cp-dropdown>`,
})
export class DropdownContainerComponent implements BlockComponent, OnInit, OnDestroy {
  @Input() block: DropdownBlock;
  @Output() blockDidChange: EventEmitter<DropdownBlock>;

  block$: Observable<DropdownBlock | undefined>;
  blockToSyncSubscription: Subscription;

  constructor(protected dropdownStore: DropdownStoreService) {
    this.blockDidChange = new EventEmitter();
  }

  ngOnInit(): void {
    this.dropdownStore.addBlock(this.block);
    this.setupAsyncObs();
    this.subscribeAllObs();
  }

  ngOnDestroy(): void {
    this.unsubscribeAllObs();
    this.dropdownStore.clearBlock(this.block.id);
  }

  valueDidChange(value: string): void {
    this.updateBlock(value);
  }

  protected updateBlock(value: string): void {
    const block = {
      id: this.block.id,
      changes: {
        value: value,
      },
    };
    this.dropdownStore.updateBlock(block);
  }

  protected setupAsyncObs(): void {
    this.block$ = this.dropdownStore.getDropdownById(this.block.id);
  }

  protected subscribeAllObs(): void {
    this.blockToSyncSubscription = this.dropdownStore.getDropdownToSyncById(this.block.id)
      .subscribe(block => {
        if (block) {
          this.blockDidChange.emit(block);
          this.dropdownStore.syncronized(this.block.id);
        }
      });
  }

  protected unsubscribeAllObs(): void {
    if (this.blockToSyncSubscription) {
      this.blockToSyncSubscription.unsubscribe();
    }
  }
}
