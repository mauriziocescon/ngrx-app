import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { BlockType, TextInputBlock } from "../../../../../../models";

import { TextInputStoreService } from "./text-input-store.service";

@Component({
  selector: "ct-text-input",
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
export class TextInputContainerComponent {
  @Input() blockId: number;

  block$: Observable<TextInputBlock>;
  textInputBlock: TextInputBlock;

  loading$: Observable<boolean>;

  constructor(protected textInputStore: TextInputStoreService) {
    this.block$ = this.textInputStore.getAllTextInput()
      .map((blocks: TextInputBlock[]) => {
        return blocks.find((block: TextInputBlock) => {
          return block.id === this.blockId;
        });
      })
      .map((block) => {
        return this.textInputBlock = block;
      });

    this.loading$ = this.textInputStore.getTextInputBlocksLoading()
      .map((blocksLoading: { [id: string]: boolean }) => {
        return blocksLoading[this.blockId];
      });
  }

  valueDidChange(value: string): void {
    this.dispatchValueDidChangeAction(value);
  }

  protected dispatchValueDidChangeAction(value: string): void {
    const block = {
      block: {
        id: this.blockId,
        changes: {
          id: this.blockId,
          type: BlockType.TextInput,
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
      notify: true,
    };
    this.textInputStore.dispatchUpdateBlock(block);
  }
}
