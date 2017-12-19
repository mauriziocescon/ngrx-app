import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { Store } from "@ngrx/store";

import * as fromDynamicForm from "../../../reducers";
import * as checkBox from "../../../actions/blocks/text-input.actions";
import { TextInputBlock } from "../../../models";

@Component({
  selector: "ct-text-input",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-text-input
      [block]="block"
      (valueDidChange)="valueDidChange($event)">
    </cp-text-input>`,
})
export class TextInputContainerComponent {
  @Input() block: TextInputBlock;

  constructor(private store: Store<fromDynamicForm.State>) {
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
