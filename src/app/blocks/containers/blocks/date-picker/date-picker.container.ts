import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';

import { BlockComponent } from '../../../../shared/shared.module';

import { DatePickerBlock } from '../../../models';

import { DatePickerStoreService } from './date-picker-store.service';

@Component({
  selector: 'ct-date-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DatePickerStoreService,
  ],
  template: `
    <cp-date-picker
      [block]="block$ | async">
    </cp-date-picker>`,
})
export class DatePickerContainerComponent implements BlockComponent, OnInit, OnDestroy {
  @Input() blockId: string;

  block$: Observable<DatePickerBlock | undefined>;

  constructor(protected datePickerStore: DatePickerStoreService) {
  }

  ngOnInit(): void {
    this.setupAsyncObs();
  }

  ngOnDestroy(): void {
  }

  valueDidChange(value: string): void {
    this.updateBlock(value);
  }

  protected updateBlock(value: string): void {
    const block = {
      id: this.blockId,
      changes: {
        value: value,
      },
    };
    this.datePickerStore.updateBlock(block);
  }

  protected setupAsyncObs(): void {
    this.block$ = this.datePickerStore.getBlockById(this.blockId);
  }
}
