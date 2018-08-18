import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';

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
  @Input() readonly block: TextInputBlock;

  block$: Observable<TextInputBlock | undefined>;

  constructor(protected textInputStore: TextInputStoreService) {
  }

  ngOnInit(): void {
    this.textInputStore.addBlock(this.block);
    this.setupAsyncObs();
  }

  ngOnDestroy(): void {
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
}
