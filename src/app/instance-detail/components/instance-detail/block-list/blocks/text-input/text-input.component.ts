import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { NGXLogger } from 'ngx-logger';

import { TextInputBlock } from '../../../../../models';

@Component({
  selector: 'cp-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit, OnChanges, OnDestroy {
  @Input() block: TextInputBlock;
  @Output() valueDidChange: EventEmitter<string>;

  textInputForm: FormGroup;
  protected textInputControl: FormControl;

  protected textInputControlSubscription: Subscription;

  constructor(protected formBuilder: FormBuilder,
              protected logger: NGXLogger) {
    this.valueDidChange = new EventEmitter<string>();
  }

  get isTextInputNotEmpty(): boolean {
    return this.textInputControl.value;
  }

  get inputGroupMessage(): string {
    if (this.block) {
      if (this.block.minLength !== undefined && this.block.minLength >= 0 && this.block.maxLength !== undefined && this.block.maxLength >= 0) {
        return 'COMPONENT.TEXT_INPUT.TEXT_INPUT_MSG_MIN_MAX_LENGTH';
      } else if (this.block.minLength !== undefined && this.block.minLength >= 0) {
        return 'COMPONENT.TEXT_INPUT.TEXT_INPUT_MSG_MIN_LENGTH';
      } else if (this.block.maxLength !== undefined && this.block.maxLength >= 0) {
        return 'COMPONENT.TEXT_INPUT.TEXT_INPUT_MSG_MAX_LENGTH';
      } else {
        return ``;
      }
    }

    return '';
  }

  get inputGroupParams(): any {
    if (this.block) {
      if (this.block.minLength !== undefined && this.block.minLength >= 0 && this.block.maxLength !== undefined && this.block.maxLength >= 0) {
        return {
          minLength: this.block.minLength,
          maxLength: this.block.maxLength,
        };
      } else if (this.block.minLength !== undefined && this.block.minLength >= 0) {
        return {
          minLength: this.block.minLength,
        };
      } else if (this.block.maxLength !== undefined && this.block.maxLength >= 0) {
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
    this.textInputForm = this.formBuilder.group({
      textInput: this.textInputControl = new FormControl(),
    });
    this.setupFormControllers();

    this.subscribeToTextInputControlValueChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.block.isFirstChange()) {
      this.unsubscribeToTextInputControlValueChanges();
      this.setupFormControllers();
      this.subscribeToTextInputControlValueChanges();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeToTextInputControlValueChanges();
  }

  protected setupFormControllers(): void {
    const validators = [
      ...this.insertIf(this.block.required, Validators.required),
      ...this.insertIf(this.block.minLength !== undefined && this.block.minLength >= 0, Validators.minLength(this.block.minLength as number)),
      ...this.insertIf(this.block.maxLength !== undefined && this.block.maxLength >= 0, Validators.maxLength(this.block.maxLength as number)),
    ];
    this.textInputControl.setValue(this.block.value);
    this.setDisableEnable(this.block.disabled, this.textInputControl);
    this.textInputControl.setValidators(validators);
  }

  protected subscribeToTextInputControlValueChanges(): void {
    this.unsubscribeToTextInputControlValueChanges();

    this.textInputControlSubscription = this.textInputControl
      .valueChanges
      .pipe(
        debounceTime(500),
      )
      .subscribe((value: string) => {
          this.valueDidChange.emit(value);
        },
        (e) => {
          this.logger.error(e.toString());
        });
  }

  resetTextInput(): void {
    this.textInputControl.setValue('');
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

  protected unsubscribeToTextInputControlValueChanges(): void {
    if (this.textInputControlSubscription) {
      this.textInputControlSubscription.unsubscribe();
    }
  }
}
