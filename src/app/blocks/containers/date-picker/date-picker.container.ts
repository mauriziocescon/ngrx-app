import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { BlockComponent, BlockType } from '../../../shared/shared.module';

import { DatePickerBlock } from '../../models';

import { DatePickerStoreService } from './date-picker-store.service';

@Component({
  selector: 'ct-date-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DatePickerStoreService,
  ],
  template: `
    <cp-date-picker
      [block]="block$ | async"
      [loading]="loading$ | async"
      (valueDidChange)="valueDidChange($event)">
    </cp-date-picker>`,
})
export class DatePickerContainerComponent implements BlockComponent {
  @Input() readonly blockId: string;

  block$: Observable<DatePickerBlock | undefined>;
  datePickerBlock: DatePickerBlock | undefined;

  loading$: Observable<boolean>;

  constructor(protected datePickerStore: DatePickerStoreService,
              protected translate: TranslateService) {
    this.block$ = this.datePickerStore.getDatePickerEntities()
      .pipe(
        map((entities: { [id: string]: DatePickerBlock }) => {
          return this.datePickerBlock = entities[this.blockId];
        }),
      );

    this.loading$ = this.datePickerStore.getDatePickerBlocksLoading()
      .pipe(
        map((blocksLoading: { [id: string]: boolean }) => {
          return blocksLoading[this.blockId];
        }),
      );
  }

  valueDidChange(value: string): void {
    this.dispatchValueDidChangeAction(value);
  }

  protected dispatchValueDidChangeAction(value: string): void {
    if (this.datePickerBlock) {
      const block = {
        id: this.blockId,
        changes: {
          id: this.blockId,
          type: BlockType.DatePicker,
          order: this.datePickerBlock.order,
          label: this.datePickerBlock.label,
          value: value,
          description: this.datePickerBlock.description,
          required: this.datePickerBlock.required,
          disabled: this.datePickerBlock.disabled,
        },
      };
      this.datePickerStore.updateBlock(block);
    }
  }
}
