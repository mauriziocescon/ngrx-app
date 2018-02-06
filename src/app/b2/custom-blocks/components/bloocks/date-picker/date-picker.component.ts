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
    const date = new Date(this.block.value);
    this.selectedDate = {year: date.getFullYear(), month: date.getMonth(), day: date.getDay()};
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.block.isFirstChange()) {
      const date = new Date(this.block.value);
      this.selectedDate = {year: date.getFullYear(), month: date.getMonth(), day: date.getDay()};
    }
  }

  onChange(newDate: NgbDateStruct): void {
    const date = new Date(newDate.year, newDate.month, newDate.day);
    this.valueDidChange.emit(date.toString());
  }
}
