import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { Store } from "@ngrx/store";

import * as fromDynamicForm from "../../../reducers";
import * as checkBox from "../../../actions/blocks/dropdown.actions";
import { DropdownBlock } from "../../../models";

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
  @Input() block: DropdownBlock;

  constructor(protected store: Store<fromDynamicForm.State>) {
  }

  valueDidChange(value: string): void {
    const block = {
      block: {
        id: this.block.id,
        changes: {
          ...this.block,
          value: value,
        },
      }
    };
    this.store.dispatch(new checkBox.ValueDidChange(block));
  }
}
