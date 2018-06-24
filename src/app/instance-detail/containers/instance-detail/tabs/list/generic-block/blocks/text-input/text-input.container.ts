import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BlockComponent, BlockType, TextInputBlock } from '../../../../../../../models';

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
      [loading]="loading$ | async"
      (valueDidChange)="valueDidChange($event)">
    </cp-text-input>`,
})
export class TextInputContainerComponent implements BlockComponent {
  @Input() readonly blockId: string;

  block$: Observable<TextInputBlock | undefined>;
  textInputBlock: TextInputBlock | undefined;

  loading$: Observable<boolean>;

  constructor(protected textInputStore: TextInputStoreService) {
    this.block$ = this.textInputStore.getTextInputEntities()
      .pipe(
        map((entities: { [id: string]: TextInputBlock }) => {
          return this.textInputBlock = entities[this.blockId];
        }),
      );

    this.loading$ = this.textInputStore.getTextInputBlocksLoading()
      .pipe(
        map((blocksLoading: { [id: string]: boolean }) => {
          return blocksLoading[this.blockId];
        }),
      );
  }

  valueDidChange(value: string): void {
    this.dispatchValueDidChangeAction(value);
  }

  protected dispatchValueDidChangeAction(value: string): void {
    if (this.textInputBlock) {
      const block = {
        block: {
          id: this.blockId,
          changes: {
            id: this.blockId,
            type: BlockType.TextInput,
            order: this.textInputBlock.order,
            label: this.textInputBlock.label,
            value: value,
            required: this.textInputBlock.required,
            minLength: this.textInputBlock.minLength,
            maxLength: this.textInputBlock.maxLength,
            disabled: this.textInputBlock.disabled,
            hooks: {
              ...this.textInputBlock.hooks,
            },
          },
        },
        triggerHooks: true,
      };
      this.textInputStore.dispatchUpdateBlock(block);
    }
  }
}
