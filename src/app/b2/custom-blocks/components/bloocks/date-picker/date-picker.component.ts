import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/debounceTime";

import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { NGXLogger } from "ngx-logger";

import { DatePickerBlock } from "../../../models";

@Component({
  selector: "cp-date-picker",
  templateUrl: "./date-picker.component.html",
  styleUrls: ["./date-picker.component.scss"]
})
export class DatePickerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() block: DatePickerBlock;
  @Input() loading: boolean;
  @Output() valueDidChange: EventEmitter<boolean>;

  selectedDate: NgbDateStruct;

  constructor(protected logger: NGXLogger) {
    this.valueDidChange = new EventEmitter<boolean>();
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

  ngOnDestroy(): void {
  }
}
