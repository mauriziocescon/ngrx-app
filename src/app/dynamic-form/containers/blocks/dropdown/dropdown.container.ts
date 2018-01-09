import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/find";
import "rxjs/add/operator/mergeMap";

import * as fromDynamicForm from "../../../reducers";
import * as dropdown from "../../../actions/blocks/dropdown.actions";
import { BlockType, DropdownBlock } from "../../../models";

@Component({
  selector: "ct-dropdown",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-dropdown
      [block]="block$ | async"
      (valueDidChange)="valueDidChange($event)">
    </cp-dropdown>`,
})
export class DropdownContainerComponent {
  @Input() blockId: number;

  block$: Observable<DropdownBlock>;
  dropdownBlock: DropdownBlock;

  constructor(protected store: Store<fromDynamicForm.State>) {
    this.block$ = this.store.select(fromDynamicForm.getAllEditBlocks)
      .map((blocks: DropdownBlock[]) => {
        return blocks.find((block: DropdownBlock) => {
          return block.id === this.blockId;
        });
      })
      .map((block) => {
        return this.dropdownBlock = block;
      });
  }

  valueDidChange(value: string): void {
    this.dispatchValueDidChangeAction(value);
  }

  protected dispatchValueDidChangeAction(value: string): void {
    const valid = this.dropdownBlock.required ? !!value : true;
    const block = {
      block: {
        id: this.blockId,
        changes: {
          id: this.blockId,
          type: BlockType.Dropdown,
          value: value,
          valid: valid,
        },
      }
    };
    this.store.dispatch(new dropdown.ValueDidChange(block));
  }
}
