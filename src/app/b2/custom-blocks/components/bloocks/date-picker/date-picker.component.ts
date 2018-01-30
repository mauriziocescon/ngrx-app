import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/debounceTime";

import { NGXLogger } from "ngx-logger";

import { CheckBoxConfirmerBlock } from "../../../models";

@Component({
  selector: "cp-check-box-confirmer",
  templateUrl: "./date-picker.component.html",
  styleUrls: ["./date-picker.component.scss"]
})
export class CheckBoxConfirmerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() block: CheckBoxConfirmerBlock;
  @Input() loading: boolean;
  @Output() valueDidChange: EventEmitter<boolean>;

  checkBoxConfirmerForm: FormGroup;
  protected checkBoxConfirmerControl: FormControl;

  protected checkBoxConfirmerControlSubscription: Subscription;

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

    this.checkBoxConfirmerForm = this.formBuilder.group({
      checkBoxConfirmer: this.checkBoxConfirmerControl = new FormControl(controlValue, options),
    });

    this.subscribeToCheckBoxConfirmerControlValueChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.block.isFirstChange()) {
      this.unsubscribeToCheckBoxConfirmerValueChanges();
      this.checkBoxConfirmerControl.setValue(changes.block.currentValue.value);
      this.subscribeToCheckBoxConfirmerControlValueChanges();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeToCheckBoxConfirmerValueChanges();
  }

  protected subscribeToCheckBoxConfirmerControlValueChanges(): void {
    this.unsubscribeToCheckBoxConfirmerValueChanges();

    this.checkBoxConfirmerControlSubscription = this.checkBoxConfirmerControl
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

  protected unsubscribeToCheckBoxConfirmerValueChanges(): void {
    if (this.checkBoxConfirmerControlSubscription) {
      this.checkBoxConfirmerControlSubscription.unsubscribe();
    }
  }
}
