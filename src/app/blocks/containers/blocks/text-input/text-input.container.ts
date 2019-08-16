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
      [block]="block$ | async">
    </cp-text-input>`,
})
export class TextInputContainerComponent implements BlockComponent, OnInit, OnDestroy {
  @Input() blockId: string;

  block$: Observable<TextInputBlock | undefined>;

  constructor(protected textInputStore: TextInputStoreService) {
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
    const block = {
      id: this.blockId,
      changes: {
        value: value,
      },
    };
    this.textInputStore.updateBlock(block);
  }

  protected setupAsyncObs(): void {
    this.block$ = this.textInputStore.getBlockById(this.blockId);
  }
}
