import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/debounceTime";

import { CheckBoxBlock } from "../../../models";

@Component({
  selector: "cp-check-box",
  templateUrl: "./check-box.component.html",
  styleUrls: ["./check-box.component.scss"]
})
export class CheckBoxComponent implements OnInit, OnChanges, OnDestroy {
  @Input() block: CheckBoxBlock;
  @Output() valueDidChange: EventEmitter<boolean>;

  checkBoxForm: FormGroup;
  protected checkBoxControl: FormControl;

  protected checkBoxControlSubscription: Subscription;

  constructor(protected formBuilder: FormBuilder) {
    this.valueDidChange = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    const controlValue = {
      value: this.block.value,
      disabled: this.block.disabled
    };
    const options = [
      ...this.insertIf(this.block.required, Validators.required),
    ];

    this.checkBoxForm = this.formBuilder.group({
      checkBox: this.checkBoxControl = new FormControl(controlValue, options),
    });

    this.subscribeToCheckBoxControlValueChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.block.isFirstChange()) {
      this.unsubscribeToCheckBoxValueChanges();
      this.checkBoxControl.setValue(changes.block.currentValue.value);
      this.subscribeToCheckBoxControlValueChanges();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeToCheckBoxValueChanges();
  }

  protected subscribeToCheckBoxControlValueChanges(): void {
    this.unsubscribeToCheckBoxValueChanges();

    this.checkBoxControlSubscription = this.checkBoxControl
      .valueChanges
      .debounceTime(500)
      .subscribe((value: any) => {
          this.valueDidChange.emit(value);
        },
        (err: any) => {
          console.log(JSON.stringify(err));
        });
  }

  protected insertIf(condition: boolean, element: any): any[] {
    return condition ? [element] : [];
  }

  protected unsubscribeToCheckBoxValueChanges(): void {
    if (this.checkBoxControlSubscription) {
      this.checkBoxControlSubscription.unsubscribe();
    }
  }
}
