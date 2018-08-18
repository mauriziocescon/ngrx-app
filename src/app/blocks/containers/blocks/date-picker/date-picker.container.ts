import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

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
      [block]="block$ | async"
      (valueDidChange)="valueDidChange($event)">
    </cp-date-picker>`,
})
export class DatePickerContainerComponent implements BlockComponent, OnInit, OnDestroy {
  @Input() readonly block: DatePickerBlock;

  block$: Observable<DatePickerBlock | undefined>;

  constructor(protected datePickerStore: DatePickerStoreService,
              protected translate: TranslateService) {
  }

  ngOnInit(): void {
    this.datePickerStore.addBlock(this.block);
    this.setupAsyncObs();
  }

  ngOnDestroy(): void {
    this.datePickerStore.clearBlock(this.block.id);
  }

  valueDidChange(value: string): void {
    this.updateBlock(value);
  }

  protected updateBlock(value: string): void {
    const block = {
      id: this.block.id,
      changes: {
        value: value,
      },
    };
    this.datePickerStore.updateBlock(block);
  }

  protected setupAsyncObs(): void {
    this.block$ = this.datePickerStore.getDatePickerById(this.block.id);
  }
}
