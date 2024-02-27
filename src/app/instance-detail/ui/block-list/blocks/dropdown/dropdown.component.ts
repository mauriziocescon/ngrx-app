import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  inject,
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { TranslocoPipe } from '@ngneat/transloco';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ValidityStateDirective } from '../../../../../shared';

import { DropdownBlock } from '../../../../models';

@Component({
  selector: 'app-dropdown-cp',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslocoPipe,
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
          <div class="card-title">{{ "COMPONENT.DROPDOWN.HEADER" | transloco }}</div>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="form">
          <mat-form-field appearance="outline" class="card-content">
            <mat-label>{{ block.label | transloco }}</mat-label>
            <mat-select [formControl]="control">
              @for (value of block.choices; track value) {
                <mat-option [value]="value"> {{ value }}</mat-option>
              }
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
  control: FormControl<string>;

  private controlSubscription: Subscription;

  private formBuilder = inject(FormBuilder);

  constructor() {
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

  private setupController(): void {
    const validators = [
      ...this.insertIf(this.block.required, Validators.required),
    ];
    this.control.setValidators(validators);
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

  private insertIf(condition: boolean, element: any): any[] {
    return condition ? [element] : [];
  }

  private unsubscribeValueChanges(): void {
    this.controlSubscription?.unsubscribe();
  }
}
