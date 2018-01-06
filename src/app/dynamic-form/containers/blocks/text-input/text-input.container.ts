import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/find";
import "rxjs/add/operator/mergeMap";

import * as fromDynamicForm from "../../../reducers";
import * as checkBox from "../../../actions/blocks/text-input.actions";
import { BlockType, TextInputBlock } from "../../../models";

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
  @Input() blockId: number;

  block: Observable<TextInputBlock>;

  constructor(protected store: Store<fromDynamicForm.State>) {
    this.block = store.select(fromDynamicForm.getAllEditBlocks)
      .flatMap(blocks => blocks)
      .find((block: TextInputBlock) => {
        return block.id === this.blockId;
      });
  }

  valueDidChange(value: string): void {
    const block = {
      block: {
        id: this.blockId,
        changes: {
          id: this.blockId,
          type: BlockType.TextInput,
          value: value,
        },
      }
    };
    this.store.dispatch(new checkBox.ValueDidChange(block));
  }
}
