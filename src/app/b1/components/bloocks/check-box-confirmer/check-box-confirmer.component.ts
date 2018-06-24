import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { NGXLogger } from 'ngx-logger';

import { CheckBoxConfirmerBlock } from '../../../models';

@Component({
  selector: 'cp-check-box-confirmer',
  templateUrl: './check-box-confirmer.component.html',
  styleUrls: ['./check-box-confirmer.component.scss'],
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
    this.checkBoxConfirmerForm = this.formBuilder.group({
      checkBoxConfirmer: this.checkBoxConfirmerControl = new FormControl(),
    });
    this.setupFormControllers();

    this.subscribeToCheckBoxConfirmerControlValueChanges();
  }

  protected setupFormControllers(): void {
    const validators = [
      ...this.insertIf(this.block.required, Validators.required),
    ];
    this.checkBoxConfirmerControl.setValue(this.block.value);
    this.setDisableEnable(this.block.disabled, this.checkBoxConfirmerControl);
    this.checkBoxConfirmerControl.setValidators(validators);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.block.isFirstChange()) {
      this.unsubscribeToCheckBoxConfirmerValueChanges();
      this.setupFormControllers();
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

  protected unsubscribeToCheckBoxConfirmerValueChanges(): void {
    if (this.checkBoxConfirmerControlSubscription) {
      this.checkBoxConfirmerControlSubscription.unsubscribe();
    }
  }
}
