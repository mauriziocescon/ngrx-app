import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { BlockType, CheckBoxBlock } from "../../../../../../models";

import { CheckBoxStoreService } from "./check-box-store.service";

@Component({
  selector: "ct-check-box",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    CheckBoxStoreService,
  ],
  template: `
    <cp-check-box
      [block]="block$ | async"
      [loading]="loading$ | async"
      (valueDidChange)="valueDidChange($event)">
    </cp-check-box>`,
})
export class CheckBoxContainerComponent {
  @Input() blockId: string;

  block$: Observable<CheckBoxBlock | undefined>;
  checkBoxBlock: CheckBoxBlock | undefined;

  loading$: Observable<boolean>;

  constructor(protected checkBoxStore: CheckBoxStoreService) {
    this.block$ = this.checkBoxStore.getAllCheckBox()
      .map((blocks: CheckBoxBlock[]) => {
        return blocks.find((block: CheckBoxBlock) => {
          return block.id === this.blockId;
        });
      })
      .map(block => {
        return this.checkBoxBlock = block;
      });

    this.loading$ = this.checkBoxStore.getCheckBoxBlocksLoading()
      .map((blocksLoading: { [id: string]: boolean }) => {
        return blocksLoading[this.blockId];
      });
  }

  valueDidChange(value: boolean): void {
    this.dispatchValueDidChangeAction(value);
  }

  protected dispatchValueDidChangeAction(value: boolean): void {
    if (this.checkBoxBlock) {
      const block = {
        block: {
          id: this.blockId,
          changes: {
            id: this.blockId,
            type: BlockType.CheckBox,
            order: this.checkBoxBlock.order,
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
      this.checkBoxStore.dispatchUpdateBlock(block);
    }
  }
}
