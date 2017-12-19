import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { Store } from "@ngrx/store";

import * as fromDynamicForm from "../../../reducers";
import * as checkBox from "../../../actions/blocks/check-box.actions";
import { CheckBoxBlock } from "../../../models";

@Component({
  selector: "ct-check-box",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-check-box
      [block]="block"
      (valueDidChange)="valueDidChange($event)">
    </cp-check-box>`,
})
export class CheckBoxContainerComponent {
  @Input() block: CheckBoxBlock;

  constructor(private store: Store<fromDynamicForm.State>) {
  }

  valueDidChange(value: boolean): void {
    console.log(`CheckBoxContainerComponent: ${JSON.stringify(value)}`);

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
