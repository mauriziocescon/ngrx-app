import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { TranslateService } from "@ngx-translate/core";

import * as fromB2Blocks from "../../../reducers";
import * as datePicker from "../../../actions/blocks/date-picker.actions";
import { B2BlockType, DatePickerBlock } from "../../../models";

import * as fromRoot from "../../../../../reducers";

@Component({
  selector: "ct-date-picker",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-date-picker
      [block]="block$ | async"
      [loading]="loading$ | async"
      (valueDidChange)="valueDidChange($event)">
    </cp-date-picker>`,
})
export class DatePickerContainerComponent {
  @Input() blockId: number;

  block$: Observable<DatePickerBlock>;
  datePickerBlock: DatePickerBlock;

  loading$: Observable<boolean>;

  constructor(protected store: Store<fromRoot.State>,
              protected translate: TranslateService) {
    this.block$ = this.store.select(fromB2Blocks.getAllDatePicker)
      .map((blocks: DatePickerBlock[]) => {
        return blocks.find((block: DatePickerBlock) => {
          return block.id === this.blockId;
        });
      })
      .map((block) => {
        return this.datePickerBlock = block;
      });

    this.loading$ = this.store.select(fromB2Blocks.getDatePickerBlocksLoadingState)
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
          type: B2BlockType.DatePicker,
          label: this.datePickerBlock.label,
          value: value,
          description: this.datePickerBlock.description,
          required: this.datePickerBlock.required,
          disabled: this.datePickerBlock.disabled,
          hooks: {
            ...this.datePickerBlock.hooks,
          },
        },
      },
      notify: true,
    };
    this.store.dispatch(new datePicker.UpdateBlock(block));
  }
}
