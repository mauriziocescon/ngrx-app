import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/debounceTime";

import { NGXLogger } from "ngx-logger";

import { TextInputConfirmerBlock } from "../../../models";

@Component({
  selector: "cp-text-input-confirmer",
  templateUrl: "./text-input-confirmer.component.html",
  styleUrls: ["./text-input-confirmer.component.scss"]
})
export class TextInputConfirmerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() block: TextInputConfirmerBlock;
  @Input() loading: boolean;
  @Output() valueDidChange: EventEmitter<string>;

  textInputConfirmerForm: FormGroup;
  protected textInputConfirmerControl: FormControl;

  protected textInputConfirmerControlSubscription: Subscription;

  constructor(protected formBuilder: FormBuilder,
              protected logger: NGXLogger) {
    this.valueDidChange = new EventEmitter<string>();
  }

  get isLoading(): boolean {
    return this.loading === true;
  }

  get isTextInputConfirmerNotEmpty(): boolean {
    return this.textInputConfirmerControl.value;
  }

  get inputGroupMessage(): string {
    if (this.block) {
      if (this.block.minLength >= 0 && this.block.maxLength >= 0) {
        return "COMPONENT.TEXT_INPUT-CONFIRMER.TEXT_INPUT_MSG_MIN_MAX_LENGTH";
      } else if (this.block.minLength >= 0) {
        return "COMPONENT.TEXT_INPUT-CONFIRMER.TEXT_INPUT_MSG_MIN_LENGTH";
      } else if (this.block.maxLength >= 0) {
        return "COMPONENT.TEXT_INPUT-CONFIRMER.TEXT_INPUT_MSG_MAX_LENGTH";
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

    this.textInputConfirmerForm = this.formBuilder.group({
      textInputConfirmer: this.textInputConfirmerControl = new FormControl(controlValue, options),
    });

    this.subscribeToTextInputConfirmerControlValueChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.block.isFirstChange()) {
      this.unsubscribeToTextInputConfirmerControlValueChanges();
      this.textInputConfirmerControl.setValue(changes.block.currentValue.value);
      this.subscribeToTextInputConfirmerControlValueChanges();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeToTextInputConfirmerControlValueChanges();
  }

  protected subscribeToTextInputConfirmerControlValueChanges(): void {
    this.unsubscribeToTextInputConfirmerControlValueChanges();

    this.textInputConfirmerControlSubscription = this.textInputConfirmerControl
      .valueChanges
      .debounceTime(500)
      .subscribe((value: any) => {
          this.valueDidChange.emit(value);
        },
        (err: any) => {
          this.logger.error(JSON.stringify(err));
        });
  }

  resetTextInputConfirmer(): void {
    this.textInputConfirmerControl.setValue("");
  }

  protected insertIf(condition: boolean, element: any): any[] {
    return condition ? [element] : [];
  }

  protected unsubscribeToTextInputConfirmerControlValueChanges(): void {
    if (this.textInputConfirmerControlSubscription) {
      this.textInputConfirmerControlSubscription.unsubscribe();
    }
  }
}
