import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { NgFor } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { TranslateModule } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';

import { ValidityStateDirective } from '../../../../../shared';

import { DropdownBlock } from '../../../../models';

@Component({
  selector: 'app-dropdown-cp',
  standalone: true,
  imports: [
    NgFor,
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
              <span>{{ "COMPONENT.DROPDOWN.HEADER" | translate }}</span>&nbsp;
              <span appValidityState [valid]="block.valid"></span>
            </div>
            <div class="card-body">
              <form [formGroup]="dropdownForm">
                <div class="form-group row">
                  <label for="{{ block.id }}" class="col-sm-2 col-form-label">{{ block.label | translate }}</label>
                  <div class="col-sm-10">
                    <div class="input-group">
                      <select class="custom-select" id="{{ block.id }}" formControlName="selectedValue">
                        <option *ngFor="let value of block.choices" [ngValue]="value">
                          {{ value }}
                        </option>
                      </select>
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
export class DropdownComponent implements OnInit, OnChanges, OnDestroy {
  @Input() block: DropdownBlock;
  @Output() valueDidChange: EventEmitter<string>;

  dropdownForm: FormGroup;
  protected dropdownControl: FormControl;

  protected dropdownControlSubscription: Subscription;

  constructor(protected formBuilder: FormBuilder,
              protected logger: NGXLogger) {
    this.valueDidChange = new EventEmitter<string>();
  }

  ngOnInit(): void {
    this.dropdownForm = this.formBuilder.group({
      selectedValue: this.dropdownControl = new FormControl(),
    });
    this.setupFormControllers();

    this.subscribeToDropdownControlValueChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['block'].isFirstChange()) {
      this.unsubscribeToDropdownControlValueChanges();
      this.setupFormControllers();
      this.subscribeToDropdownControlValueChanges();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeToDropdownControlValueChanges();
  }

  protected setupFormControllers(): void {
    const validators = [
      ...this.insertIf(this.block.required, Validators.required),
    ];
    this.dropdownControl.setValidators(validators);
    this.setDisableEnable(this.block.disabled, this.dropdownControl);
    this.dropdownControl.setValue(this.block.value);
  }

  protected subscribeToDropdownControlValueChanges(): void {
    this.unsubscribeToDropdownControlValueChanges();

    this.dropdownControlSubscription = this.dropdownControl
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

  protected unsubscribeToDropdownControlValueChanges(): void {
    if (this.dropdownControlSubscription) {
      this.dropdownControlSubscription.unsubscribe();
    }
  }
}
