import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { BlockType, CheckBoxBlock } from "../../../../../../models";

import { CheckBoxStoreService } from "./check-box-store.service";

@Component({
  selector: "ct-check-box",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-check-box
      [block]="block$ | async"
      [loading]="loading$ | async"
      (valueDidChange)="valueDidChange($event)">
    </cp-check-box>`,
  providers: [
    CheckBoxStoreService,
  ],
})
export class CheckBoxContainerComponent {
  @Input() blockId: number;

  block$: Observable<CheckBoxBlock>;
  checkBoxBlock: CheckBoxBlock;

  loading$: Observable<boolean>;

  constructor(protected checkBoxStoreSelectors: CheckBoxStoreService) {
    this.block$ = this.checkBoxStoreSelectors.getAllCheckBox()
      .map((blocks: CheckBoxBlock[]) => {
        return blocks.find((block: CheckBoxBlock) => {
          return block.id === this.blockId;
        });
      })
      .map((block) => {
        return this.checkBoxBlock = block;
      });

    this.loading$ = this.checkBoxStoreSelectors.getCheckBoxBlocksLoading()
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
    this.checkBoxStoreSelectors.dispatchUpdateBlock(block);
  }
}
