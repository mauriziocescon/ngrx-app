import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import * as fromDynamicBlocksList from "../../../reducers";
import * as dropdown from "../../../actions/blocks/dropdown.actions";
import { BlockType, DropdownBlock } from "../../../models";

@Component({
  selector: "ct-dropdown",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-dropdown
      [block]="block$ | async"
      [loading]="loading$ | async"
      (valueDidChange)="valueDidChange($event)">
    </cp-dropdown>`,
})
export class DropdownContainerComponent {
  @Input() blockId: number;

  block$: Observable<DropdownBlock>;
  dropdownBlock: DropdownBlock;

  loading$: Observable<boolean>;

  constructor(protected store$: Store<fromDynamicBlocksList.State>) {
    this.block$ = this.store$.select(fromDynamicBlocksList.getAllDropdown)
      .map((blocks: DropdownBlock[]) => {
        return blocks.find((block: DropdownBlock) => {
          return block.id === this.blockId;
        });
      })
      .map((block) => {
        return this.dropdownBlock = block;
      });

    this.loading$ = this.store$.select(fromDynamicBlocksList.getDropdownBlocksLoadingState)
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
          type: BlockType.Dropdown,
          label: this.dropdownBlock.label,
          value: value,
          choices: [...this.dropdownBlock.choices],
          required: this.dropdownBlock.required,
          disabled: this.dropdownBlock.disabled,
          hooks: {
            ...this.dropdownBlock.hooks,
          },
        },
      },
      notify: true,
    };
    this.store$.dispatch(new dropdown.UpdateBlock(block));
  }
}
