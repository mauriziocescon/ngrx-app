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
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ValidityStateDirective } from '../../../../../shared';

import { CheckBoxBlock } from '../../../../models';

@Component({
  selector: 'app-check-box-cp',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslocoPipe,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    ValidityStateDirective,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>
          <div class="card-title">{{ "COMPONENT.CHECK_BOX.HEADER" | transloco }}</div>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="form">
          <label>{{ block.label | transloco }}</label>
          <mat-checkbox formControlName="checkBox">{{ block.description | transloco }}</mat-checkbox>
        </form>
      </mat-card-content>
      <mat-card-actions>
        <span appValidityState [valid]="block.valid"></span>
      </mat-card-actions>
    </mat-card>`,
})
export class CheckBoxComponent implements OnInit, OnChanges, OnDestroy {
  @Input() block: CheckBoxBlock;
  @Output() valueDidChange: EventEmitter<boolean>;

  form: FormGroup;
  private control: FormControl<boolean>;

  private controlSubscription: Subscription;

  private formBuilder = inject(FormBuilder);

  constructor() {
    this.valueDidChange = new EventEmitter();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      checkBox: this.control = new FormControl(),
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
