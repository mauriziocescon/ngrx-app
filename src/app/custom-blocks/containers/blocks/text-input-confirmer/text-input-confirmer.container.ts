import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import * as fromDynamicForm from "../../../../reducers";
import * as textInputConfirmer from "../../../actions/blocks/text-input-confirmer.actions";
import { BlockType, TextInputConfirmerBlock } from "../../../models";

@Component({
  selector: "ct-text-input-confirmer",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-text-input-confirmer
      [block]="block$ | async"
      [loading]="loading$ | async"
      (valueDidChange)="valueDidChange($event)">
    </cp-text-input-confirmer>`,
})
export class TextInputConfirmerContainerComponent {
  @Input() blockId: number;

  block$: Observable<TextInputConfirmerBlock>;
  textInputConfirmerBlock: TextInputConfirmerBlock;

  loading$: Observable<boolean>;

  constructor(protected store: Store<fromDynamicForm.State>) {
    this.block$ = this.store.select(fromDynamicForm.getAllTextInputConfirmers)
      .map((blocks: TextInputConfirmerBlock[]) => {
        return blocks.find((block: TextInputConfirmerBlock) => {
          return block.id === this.blockId;
        });
      })
      .map((block) => {
        return this.textInputConfirmerBlock = block;
      });

    this.loading$ = this.store.select(fromDynamicForm.getTextInputConfirmerBlocksLoadingState)
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
          type: BlockType.TextInputConfirmer,
          label: this.textInputConfirmerBlock.label,
          value: value,
          required: this.textInputConfirmerBlock.required,
          minLength: this.textInputConfirmerBlock.minLength,
          maxLength: this.textInputConfirmerBlock.maxLength,
          disabled: this.textInputConfirmerBlock.disabled,
        },
      },
      notify: true,
    };
    this.store.dispatch(new textInputConfirmer.UpdateBlock(block));
  }
}
