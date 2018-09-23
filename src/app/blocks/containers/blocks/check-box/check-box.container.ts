import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { BlockComponent } from '../../../../shared/shared.module';

import { CheckBoxBlock } from '../../../models';

import { CheckBoxStoreService } from './check-box-store.service';

@Component({
  selector: 'ct-check-box',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    CheckBoxStoreService,
  ],
  template: `
    <cp-check-box
      [block]="block$ | async"
      (valueDidChange)="valueDidChange($event)">
    </cp-check-box>`,
})
export class CheckBoxContainerComponent implements BlockComponent, OnInit, OnDestroy {
  @Input() block: CheckBoxBlock;
  @Output() blockDidChange: EventEmitter<CheckBoxBlock>;

  block$: Observable<CheckBoxBlock | undefined>;
  blockToSyncSubscription: Subscription;

  constructor(protected checkBoxStore: CheckBoxStoreService) {
    this.blockDidChange = new EventEmitter();
  }

  ngOnInit(): void {
    this.checkBoxStore.addBlock(this.block);
    this.setupAsyncObs();
    this.subscribeAllObs();
  }

  ngOnDestroy(): void {
    this.unsubscribeAllObs();
    this.checkBoxStore.clearBlock(this.block.id);
  }

  valueDidChange(value: boolean): void {
    this.updateBlock(value);
  }

  protected updateBlock(value: boolean): void {
    const block = {
      id: this.block.id,
      changes: {
        value: value,
      },
    };
    this.checkBoxStore.updateBlock(block);
  }

  protected setupAsyncObs(): void {
    this.block$ = this.checkBoxStore.getCheckBoxById(this.block.id);
  }

  protected subscribeAllObs(): void {
    this.blockToSyncSubscription = this.checkBoxStore.getCheckBoxToSyncById(this.block.id)
      .subscribe(block => {
        if (block) {
          this.blockDidChange.emit(block);
          this.checkBoxStore.syncronized(this.block.id);
        }
      });
  }

  protected unsubscribeAllObs(): void {
    if (this.blockToSyncSubscription) {
      this.blockToSyncSubscription.unsubscribe();
    }
  }
}
