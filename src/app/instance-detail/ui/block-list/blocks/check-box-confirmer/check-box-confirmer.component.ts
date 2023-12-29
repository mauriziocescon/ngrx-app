import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { TranslateModule } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';

import { ValidityStateDirective } from '../../../../../shared';

import { CheckBoxConfirmerBlock } from '../../../../models';

@Component({
  selector: 'app-check-box-confirmer-cp',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    ValidityStateDirective,
  ],
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <span>{{ "COMPONENT.CHECK_BOX_CONFIRMER.HEADER" | translate }}</span>&nbsp;
              <span appValidityState [valid]="block.valid"></span>
            </div>
            <div class="card-body">
              <form [formGroup]="checkBoxConfirmerForm">
                <div class="form-group row">
                  <label for="{{ block.id }}" class="col-sm-2 col-form-label">{{ block.label | translate }}</label>
                  <div class="col-sm-10">
                    <div class="form-check">
                      <label class="form-check-label">
                        <input type="checkBox" class="form-check-input" id="{{ block.id }}"
                               formControlName="checkBoxConfirmer">
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
export class CheckBoxConfirmerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() block: CheckBoxConfirmerBlock;
  @Output() valueDidChange: EventEmitter<boolean>;

  checkBoxConfirmerForm: FormGroup;
  protected checkBoxConfirmerControl: FormControl;

  protected checkBoxConfirmerControlSubscription: Subscription;

  constructor(protected formBuilder: FormBuilder,
              protected logger: NGXLogger) {
    this.valueDidChange = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    this.checkBoxConfirmerForm = this.formBuilder.group({
      checkBoxConfirmer: this.checkBoxConfirmerControl = new FormControl(),
    });
    this.setupFormControllers();

    this.subscribeToCheckBoxConfirmerControlValueChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['block'].isFirstChange()) {
      this.unsubscribeToCheckBoxConfirmerValueChanges();
      this.setupFormControllers();
      this.subscribeToCheckBoxConfirmerControlValueChanges();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeToCheckBoxConfirmerValueChanges();
  }

  protected setupFormControllers(): void {
    const validators = [
      ...this.insertIf(this.block.required, Validators.required),
    ];
    this.checkBoxConfirmerControl.setValidators(validators);
    this.setDisableEnable(this.block.disabled, this.checkBoxConfirmerControl);
    this.checkBoxConfirmerControl.setValue(this.block.value);
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
