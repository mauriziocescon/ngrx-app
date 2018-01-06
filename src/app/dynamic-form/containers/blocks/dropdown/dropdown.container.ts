import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/find";
import "rxjs/add/operator/mergeMap";

import * as fromDynamicForm from "../../../reducers";
import * as checkBox from "../../../actions/blocks/dropdown.actions";
import { BlockType, DropdownBlock } from "../../../models";

@Component({
  selector: "ct-dropdown",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-dropdown
      [block]="block"
      (valueDidChange)="valueDidChange($event)">
    </cp-dropdown>`,
})
export class DropdownContainerComponent {
  @Input() blockId: number;

  block: Observable<DropdownBlock>;

  constructor(protected store: Store<fromDynamicForm.State>) {
    this.block = store.select(fromDynamicForm.getAllEditBlocks)
      .flatMap(blocks => blocks)
      .find((block: DropdownBlock) => {
        return block.id === this.blockId;
      });
  }

  valueDidChange(value: string): void {
    const block = {
      block: {
        id: this.blockId,
        changes: {
          id: this.blockId,
          type: BlockType.Dropdown,
          value: value,
        },
      }
    };
    this.store.dispatch(new checkBox.ValueDidChange(block));
  }
}
