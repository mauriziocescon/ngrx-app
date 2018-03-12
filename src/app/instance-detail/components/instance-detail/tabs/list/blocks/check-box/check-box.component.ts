import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/debounceTime";

import { NGXLogger } from "ngx-logger";

import { CheckBoxBlock } from "../../../../../../models";

@Component({
  selector: "cp-check-box",
  templateUrl: "./check-box.component.html",
  styleUrls: ["./check-box.component.scss"]
})
export class CheckBoxComponent implements OnInit, OnChanges, OnDestroy {
  @Input() block: CheckBoxBlock;
  @Input() loading: boolean;
  @Output() valueDidChange: EventEmitter<boolean>;

  checkBoxForm: FormGroup;
  protected checkBoxControl: FormControl;

  protected checkBoxControlSubscription: Subscription;

  constructor(protected formBuilder: FormBuilder,
              protected logger: NGXLogger) {
    this.valueDidChange = new EventEmitter<boolean>();
  }

  get isLoading(): boolean {
    return this.loading === true;
  }

  ngOnInit(): void {
    this.checkBoxForm = this.formBuilder.group({
      checkBox: this.checkBoxControl = new FormControl(),
    });
    this.setupFormControllers();

    this.subscribeToCheckBoxControlValueChanges();
  }

  protected setupFormControllers(): void {
    const validators = [
      ...this.insertIf(this.block.required, Validators.required),
    ];
    this.checkBoxControl.setValue(this.block.value);
    this.setDisableEnable(this.block.disabled, this.checkBoxControl);
    this.checkBoxControl.setValidators(validators);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.block.isFirstChange()) {
      this.unsubscribeToCheckBoxValueChanges();
      this.setupFormControllers();
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
      .subscribe((value: boolean) => {
          this.valueDidChange.emit(value);
        },
        (e) => {
          this.logger.error(e.toString());
        });
  }

  protected setDisableEnable(condition: boolean, control: FormControl): void {
    if (condition) {
      control.disable();
    } else {
      control.enable();
    }
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
