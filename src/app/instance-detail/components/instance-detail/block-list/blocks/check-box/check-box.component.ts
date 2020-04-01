import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { NGXLogger } from 'ngx-logger';

import { CheckBoxBlock } from '../../../../../models';

@Component({
  selector: 'cp-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss'],
})
export class CheckBoxComponent implements OnInit, OnChanges, OnDestroy {
  @Input() block: CheckBoxBlock;
  @Output() valueDidChange: EventEmitter<boolean>;

  checkBoxForm: FormGroup;
  protected checkBoxControl: FormControl;

  protected checkBoxControlSubscription: Subscription;

  constructor(protected formBuilder: FormBuilder,
              protected logger: NGXLogger) {
    this.valueDidChange = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    this.checkBoxForm = this.formBuilder.group({
      checkBox: this.checkBoxControl = new FormControl(),
    });
    this.setupFormControllers();

    this.subscribeToCheckBoxControlValueChanges();
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

  protected setupFormControllers(): void {
    const validators = [
      ...this.insertIf(this.block.required, Validators.required),
    ];
    this.checkBoxControl.setValidators(validators);
    this.setDisableEnable(this.block.disabled, this.checkBoxControl);
    this.checkBoxControl.setValue(this.block.value);
  }

  protected subscribeToCheckBoxControlValueChanges(): void {
    this.unsubscribeToCheckBoxValueChanges();

    this.checkBoxControlSubscription = this.checkBoxControl
      .valueChanges
      .pipe(
        debounceTime(500),
      )
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
