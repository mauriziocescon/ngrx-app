import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { NgFor } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
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
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ValidityStateDirective,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>
          <div class="card-title">{{ "COMPONENT.DROPDOWN.HEADER" | translate }}</div>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="form">
          <mat-form-field appearance="outline" class="card-content">
            <mat-label>{{ block.label | translate }}</mat-label>
            <mat-select [formControl]="control">
              <mat-option *ngFor="let value of block.choices" [value]="value"> {{ value }}</mat-option>
            </mat-select>
          </mat-form-field>
        </form>
      </mat-card-content>
      <mat-card-actions>
        <span appValidityState [valid]="block.valid"></span>
      </mat-card-actions>
    </mat-card>`,
})
export class DropdownComponent implements OnInit, OnChanges, OnDestroy {
  @Input() block: DropdownBlock;
  @Output() valueDidChange: EventEmitter<string>;

  form: FormGroup;
  protected control: FormControl<string>;

  protected controlSubscription: Subscription;

  constructor(protected formBuilder: FormBuilder,
              protected logger: NGXLogger) {
    this.valueDidChange = new EventEmitter();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      dropdown: this.control = new FormControl(),
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
