import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { TranslateModule } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';

import { SharedModule } from '../../../../../shared';

import { CheckBoxBlock } from '../../../../models';

@Component({
  selector: 'app-check-box-cp',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
  ],
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <span>{{ "COMPONENT.CHECK_BOX.HEADER" | translate }}</span>&nbsp;
              <span appValidityState [valid]="block.valid"></span>
            </div>
            <div class="card-body">
              <form [formGroup]="checkBoxForm">
                <div class="form-group row">
                  <label for="{{ block.id }}" class="col-sm-2 col-form-label">{{ block.label | translate }}</label>
                  <div class="col-sm-10">
                    <div class="form-check">
                      <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" id="{{ block.id }}" formControlName="checkBox">
                        {{ block.description | translate }}
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>`,
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
    if (!changes['block'].isFirstChange()) {
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
