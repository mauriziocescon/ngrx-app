import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NGXLogger } from 'ngx-logger';

import { ValidityStateDirective } from '../../../../../shared';

import { CheckBoxConfirmerBlock } from '../../../../models';

@Component({
  selector: 'app-check-box-confirmer-cp',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    MatCardModule,
    MatCheckboxModule,
    ValidityStateDirective,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ "COMPONENT.CHECK_BOX_CONFIRMER.HEADER" | translate }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="form">
          <label>{{ block.label | translate }}</label>
          <mat-checkbox formControlName="checkBoxConfirmer">{{ block.description | translate }}</mat-checkbox>
        </form>
      </mat-card-content>
      <mat-card-actions>
        <span appValidityState [valid]="block.valid"></span>
      </mat-card-actions>
    </mat-card>`,
})
export class CheckBoxConfirmerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() block: CheckBoxConfirmerBlock;
  @Output() valueDidChange: EventEmitter<boolean>;

  form: FormGroup;
  protected control: FormControl<boolean>;

  protected controlSubscription: Subscription;

  constructor(protected formBuilder: FormBuilder,
              protected logger: NGXLogger) {
    this.valueDidChange = new EventEmitter();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      checkBoxConfirmer: this.control = new FormControl(),
    });
    this.setupController();

    this.subscribeValueChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['block'].isFirstChange()) {
      this.unsubscribeValueChanges();
      this.setupController();
      this.subscribeValueChanges();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeValueChanges();
  }

  protected setupController(): void {
    const validators = [
      ...this.insertIf(this.block.required, Validators.required),
    ];
    this.control.setValidators(validators);
    this.setDisableEnable(this.block.disabled, this.control);
    this.control.setValue(this.block.value);
  }

  protected subscribeValueChanges(): void {
    this.unsubscribeValueChanges();

    this.controlSubscription = this.control
      .valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: value => this.valueDidChange.emit(value),
        error: e => this.logger.error(e.toString()),
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

  protected unsubscribeValueChanges(): void {
    this.controlSubscription?.unsubscribe();
  }
}
