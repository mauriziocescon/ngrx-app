import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/debounceTime";

import { NGXLogger } from "ngx-logger";

import { TextInputBlock } from "../../../../../models";

@Component({
  selector: "cp-text-input",
  templateUrl: "./text-input.component.html",
  styleUrls: ["./text-input.component.scss"]
})
export class TextInputComponent implements OnInit, OnChanges, OnDestroy {
  @Input() block: TextInputBlock;
  @Input() loading: boolean;
  @Output() valueDidChange: EventEmitter<string>;

  textInputForm: FormGroup;
  protected textInputControl: FormControl;

  protected textInputControlSubscription: Subscription;

  constructor(protected formBuilder: FormBuilder,
              protected logger: NGXLogger) {
    this.valueDidChange = new EventEmitter<string>();
  }

  get isLoading(): boolean {
    return this.loading === true;
  }

  get isTextInputNotEmpty(): boolean {
    return this.textInputControl.value;
  }

  get inputGroupMessage(): string {
    if (this.block) {
      if (this.block.minLength >= 0 && this.block.maxLength >= 0) {
        return "COMPONENT.TEXT_INPUT.TEXT_INPUT_MSG_MIN_MAX_LENGTH";
      } else if (this.block.minLength >= 0) {
        return "COMPONENT.TEXT_INPUT.TEXT_INPUT_MSG_MIN_LENGTH";
      } else if (this.block.maxLength >= 0) {
        return "COMPONENT.TEXT_INPUT.TEXT_INPUT_MSG_MAX_LENGTH";
      } else {
        return ``;
      }
    }

    return "";
  }

  get inputGroupParams(): any {
    if (this.block) {
      if (this.block.minLength >= 0 && this.block.maxLength >= 0) {
        return {
          minLength: this.block.minLength,
          maxLength: this.block.maxLength,
        };
      } else if (this.block.minLength >= 0) {
        return {
          minLength: this.block.minLength,
        };
      } else if (this.block.maxLength >= 0) {
        return {
          maxLength: this.block.maxLength,
        };
      } else {
        return undefined;
      }
    }

    return undefined;
  }

  ngOnInit(): void {
    const controlValue = {
      value: this.block.value,
      disabled: this.block.disabled
    };
    const options = [
      ...this.insertIf(this.block.required, Validators.required),
      ...this.insertIf(this.block.minLength >= 0, Validators.minLength(this.block.minLength)),
      ...this.insertIf(this.block.maxLength >= 0, Validators.maxLength(this.block.maxLength)),
    ];

    this.textInputForm = this.formBuilder.group({
      textInput: this.textInputControl = new FormControl(controlValue, options),
    });

    this.subscribeToTextInputControlValueChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.block.isFirstChange()) {
      this.unsubscribeToTextInputControlValueChanges();
      this.textInputControl.setValue(changes.block.currentValue.value);
      this.subscribeToTextInputControlValueChanges();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeToTextInputControlValueChanges();
  }

  protected subscribeToTextInputControlValueChanges(): void {
    this.unsubscribeToTextInputControlValueChanges();

    this.textInputControlSubscription = this.textInputControl
      .valueChanges
      .debounceTime(500)
      .subscribe((value: any) => {
          this.valueDidChange.emit(value);
        },
        (err: any) => {
          this.logger.error(JSON.stringify(err));
        });
  }

  resetTextInput(): void {
    this.textInputControl.setValue("");
  }

  protected insertIf(condition: boolean, element: any): any[] {
    return condition ? [element] : [];
  }

  protected unsubscribeToTextInputControlValueChanges(): void {
    if (this.textInputControlSubscription) {
      this.textInputControlSubscription.unsubscribe();
    }
  }
}
