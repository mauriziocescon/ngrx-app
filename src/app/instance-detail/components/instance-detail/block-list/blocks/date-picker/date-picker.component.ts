import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NGXLogger } from 'ngx-logger';

import { DatePickerBlock } from '../../../../../models';

@Component({
  selector: 'cp-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit, OnChanges {
  @Input() block: DatePickerBlock;
  @Output() valueDidChange: EventEmitter<string>;

  selectedDate: NgbDateStruct;

  constructor(protected logger: NGXLogger) {
    this.valueDidChange = new EventEmitter<string>();
  }

  ngOnInit(): void {
    const date = this.block.value ? new Date(this.block.value) : new Date();
    this.selectedDate = this.fromModel(date);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.block.isFirstChange()) {
      const date = this.block.value ? new Date(this.block.value) : new Date();
      this.selectedDate = this.fromModel(date);
    }
  }

  onChange(date: NgbDateStruct): void {
    this.valueDidChange.emit(this.toModel(date).toISOString());
  }

  protected fromModel(date: Date): NgbDateStruct {
    return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
  }

  protected toModel(date: NgbDateStruct): Date {
    return new Date(date.year, date.month - 1, date.day);
  }
}
