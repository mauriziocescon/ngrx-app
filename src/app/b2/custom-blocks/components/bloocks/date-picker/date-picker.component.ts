import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from "@angular/core";

import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { NGXLogger } from "ngx-logger";

import { DatePickerBlock } from "../../../models";

@Component({
  selector: "cp-date-picker",
  templateUrl: "./date-picker.component.html",
  styleUrls: ["./date-picker.component.scss"]
})
export class DatePickerComponent implements OnInit, OnChanges {
  @Input() block: DatePickerBlock;
  @Input() loading: boolean;
  @Output() valueDidChange: EventEmitter<string>;

  selectedDate: NgbDateStruct;

  constructor(protected logger: NGXLogger) {
    this.valueDidChange = new EventEmitter<string>();
  }

  get isLoading(): boolean {
    return this.loading === true;
  }

  ngOnInit(): void {
    this.selectedDate = this.fromModel(new Date(this.block.value));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.block.isFirstChange()) {
      this.selectedDate = this.fromModel(new Date(this.block.value));
    }
  }

  onChange(date: NgbDateStruct): void {
    this.valueDidChange.emit(this.toModel(date).toISOString());
  }

  protected fromModel(date: Date): NgbDateStruct {
    return (date && date.getFullYear) ? {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()} : null;
  }

  protected toModel(date: NgbDateStruct): Date {
    return date ? new Date(date.year, date.month - 1, date.day) : null;
  }
}
