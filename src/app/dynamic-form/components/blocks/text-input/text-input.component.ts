import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

import "rxjs/add/operator/debounceTime";

import { TextInputBlock } from "../../../models";

@Component({
  selector: "cp-text-input",
  templateUrl: "./text-input.component.html",
  styleUrls: ["./text-input.component.scss"]
})
export class TextInputComponent implements OnInit, OnDestroy {
  @Input() block: TextInputBlock;
  @Output() valueDidChange: EventEmitter<string>;

  textInputForm: FormGroup;
  protected textInputControl: FormControl;

  protected textInputControlSubscription: any;

  constructor(protected formBuilder: FormBuilder) {
    this.valueDidChange = new EventEmitter<string>();
  }

  get isTextInputNotEmpty(): boolean {
    return this.textInputControl.value;
  }

  ngOnInit(): void {
    const controlValue = {
      value: this.block.value,
      disabled: this.block.disabled
    };
    const options = [
      ...this.insertIf(this.block.required, Validators.required),
      ...this.insertIf(this.block.minLength !== undefined, Validators.minLength(this.block.minLength)),
      ...this.insertIf(this.block.maxLength !== undefined, Validators.maxLength(this.block.maxLength)),
    ];

    this.textInputForm = this.formBuilder.group({
      textInput: this.textInputControl = new FormControl(controlValue, options),
    });

    this.textInputControlValueSubscription();
  }

  ngOnDestroy(): void {
    if (this.textInputControlSubscription) {
      this.textInputControlSubscription.unsubscribe();
    }
  }

  textInputControlValueSubscription(): void {
    if (this.textInputControlSubscription) {
      this.textInputControlSubscription.unsubscribe();
    }

    this.textInputControlSubscription = this.textInputControl
      .valueChanges
      .debounceTime(500)
      .subscribe((value: any) => {
          this.valueDidChange.emit(value);
        },
        (err: any) => {
          console.log(JSON.stringify(err));
        });
  }

  resetTextInput(): void {
    this.textInputControl.setValue("");
  }

  insertIf(condition: boolean, element: any): any[] {
    return condition ? [element] : [];
  }
}
