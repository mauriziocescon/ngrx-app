import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { BlockComponent } from '../../../../shared/shared.module';

import { TextInputBlock } from '../../../models';

import { TextInputStoreService } from './text-input-store.service';

@Component({
  selector: 'ct-text-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    TextInputStoreService,
  ],
  template: `
    <cp-text-input
      [block]="block$ | async"
      (valueDidChange)="valueDidChange($event)">
    </cp-text-input>`,
})
export class TextInputContainerComponent implements BlockComponent, OnInit, OnDestroy {
  @Input() block: TextInputBlock;
  @Output() blockDidChange: EventEmitter<TextInputBlock>;

  block$: Observable<TextInputBlock | undefined>;
  blockToSyncSubscription: Subscription;

  constructor(protected textInputStore: TextInputStoreService) {
    this.blockDidChange = new EventEmitter();
  }

  ngOnInit(): void {
    this.textInputStore.addBlock(this.block);
    this.setupAsyncObs();
    this.subscribeAllObs();
  }

  ngOnDestroy(): void {
    this.unsubscribeAllObs();
    this.textInputStore.clearBlock(this.block.id);
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
    this.textInputStore.updateBlock(block);
  }

  protected setupAsyncObs(): void {
    this.block$ = this.textInputStore.getTextInputById(this.block.id);
  }

  protected subscribeAllObs(): void {
    this.blockToSyncSubscription = this.textInputStore.getTextInputToSyncById(this.block.id)
      .subscribe(block => {
        if (block) {
          this.blockDidChange.emit(block);
          this.textInputStore.syncronized(this.block.id);
        }
      });
  }

  protected unsubscribeAllObs(): void {
    if (this.blockToSyncSubscription) {
      this.blockToSyncSubscription.unsubscribe();
    }
  }
}
