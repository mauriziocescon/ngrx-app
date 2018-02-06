import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import * as fromDynamicBlocksList from "../../../reducers";
import * as checkBox from "../../../actions/blocks/check-box.actions";
import { BlockType, CheckBoxBlock } from "../../../models";

@Component({
  selector: "ct-check-box",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-check-box
      [block]="block$ | async"
      [loading]="loading$ | async"
      (valueDidChange)="valueDidChange($event)">
    </cp-check-box>`,
})
export class CheckBoxContainerComponent {
  @Input() blockId: number;

  block$: Observable<CheckBoxBlock>;
  checkBoxBlock: CheckBoxBlock;

  loading$: Observable<boolean>;

  constructor(protected store: Store<fromDynamicBlocksList.State>) {
    this.block$ = this.store.select(fromDynamicBlocksList.getAllCheckBox)
      .map((blocks: CheckBoxBlock[]) => {
        return blocks.find((block: CheckBoxBlock) => {
          return block.id === this.blockId;
        });
      })
      .map((block) => {
        return this.checkBoxBlock = block;
      });

    this.loading$ = this.store.select(fromDynamicBlocksList.getCheckBoxBlocksLoadingState)
      .map((blocksLoading: { [id: string]: boolean }) => {
        return blocksLoading[this.blockId];
      });
  }

  valueDidChange(value: boolean): void {
    this.dispatchValueDidChangeAction(value);
  }

  protected dispatchValueDidChangeAction(value: boolean): void {
    const block = {
      block: {
        id: this.blockId,
        changes: {
          id: this.blockId,
          type: BlockType.CheckBox,
          label: this.checkBoxBlock.label,
          value: value,
          description: this.checkBoxBlock.description,
          required: this.checkBoxBlock.required,
          disabled: this.checkBoxBlock.disabled,
          hooks: {
            ...this.checkBoxBlock.hooks,
          },
        },
      },
      notify: true,
    };
    this.store.dispatch(new checkBox.UpdateBlock(block));
  }
}
