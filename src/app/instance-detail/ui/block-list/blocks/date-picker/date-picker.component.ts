import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnDestroy,
  inject,
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { TranslocoPipe } from '@ngneat/transloco';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

import { ValidityStateDirective } from '../../../../../shared';

import { DatePickerBlock } from '../../../../models';

@Component({
  selector: 'app-date-picker-cp',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslocoPipe,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ValidityStateDirective,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>
          <div class="card-title">{{ "COMPONENT.DATE_PICKER.HEADER" | transloco }}</div>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="form">
          <mat-form-field appearance="outline" class="card-content">
            <mat-label>{{ block.label | transloco }}</mat-label>
            <input matInput [matDatepicker]="picker1" [formControl]="control">
            <mat-hint>MM/DD/YYYY</mat-hint>
            <mat-datepicker-toggle matIconSuffix [for]="picker1"></mat-datepicker-toggle>
            <mat-datepicker #picker1></mat-datepicker>
          </mat-form-field>
        </form>
      </mat-card-content>
      <mat-card-actions>
        <span appValidityState [valid]="block.valid"></span>
      </mat-card-actions>
    </mat-card>`,
})
export class DatePickerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() block: DatePickerBlock;
  @Output() valueDidChange: EventEmitter<string>;

  form: FormGroup;
  control: FormControl<string>;

  private controlSubscription: Subscription;

  private formBuilder = inject(FormBuilder);

  constructor() {
    this.valueDidChange = new EventEmitter();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      date: this.control = new FormControl(),
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

  private setupController(): void {
    this.setDisableEnable(this.block.disabled, this.control);
    this.control.setValue(this.block.value);
  }

  private subscribeValueChanges(): void {
    this.unsubscribeValueChanges();

    this.controlSubscription = this.control
      .valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => this.valueDidChange.emit(value));
  }

  private setDisableEnable(condition: boolean, control: FormControl): void {
    if (condition) {
      control.disable();
    } else {
      control.enable();
    }
  }

  private unsubscribeValueChanges(): void {
    this.controlSubscription?.unsubscribe();
  }
}
