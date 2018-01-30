import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/debounceTime";

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

  datePickerForm: FormGroup;
  protected datePickerControl: FormControl;

  protected datePickerControlSubscription: Subscription;

  constructor(protected formBuilder: FormBuilder,
              protected logger: NGXLogger) {
    this.valueDidChange = new EventEmitter<boolean>();
  }

  get isLoading(): boolean {
    return this.loading === true;
  }

  ngOnInit(): void {
    const controlValue = {
      value: this.block.value,
      disabled: this.block.disabled
    };
    const options = [
      ...this.insertIf(this.block.required, Validators.required),
    ];

    this.datePickerForm = this.formBuilder.group({
      datePicker: this.datePickerControl = new FormControl(controlValue, options),
    });

    this.subscribeToDatePickerControlValueChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.block.isFirstChange()) {
      this.unsubscribeToDatePickerValueChanges();
      this.datePickerControl.setValue(changes.block.currentValue.value);
      this.subscribeToDatePickerControlValueChanges();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeToDatePickerValueChanges();
  }

  protected subscribeToDatePickerControlValueChanges(): void {
    this.unsubscribeToDatePickerValueChanges();

    this.datePickerControlSubscription = this.datePickerControl
      .valueChanges
      .debounceTime(500)
      .subscribe((value: any) => {
          this.valueDidChange.emit(value);
        },
        (err: any) => {
          this.logger.error(JSON.stringify(err));
        });
  }

  protected insertIf(condition: boolean, element: any): any[] {
    return condition ? [element] : [];
  }

  protected unsubscribeToDatePickerValueChanges(): void {
    if (this.datePickerControlSubscription) {
      this.datePickerControlSubscription.unsubscribe();
    }
  }
}
