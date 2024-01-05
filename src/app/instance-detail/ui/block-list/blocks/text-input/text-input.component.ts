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

import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NGXLogger } from 'ngx-logger';

import { ValidityStateDirective } from '../../../../../shared';

import { TextInputBlock } from '../../../../models';

@Component({
  selector: 'app-text-input-cp',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ValidityStateDirective,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>
          <div class="card-title">{{ "COMPONENT.TEXT_INPUT.HEADER" | translate }}</div>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="form">
          <mat-form-field appearance="outline" class="card-content">
            <mat-label>{{ block.label | translate }}</mat-label>
            <input type="text" matInput [formControl]="control"
                   placeholder="{{ 'COMPONENT.TEXT_INPUT.TEXT_INPUT_PLACEHOLDER' | translate }}">
            @if (isTextInputNotEmpty) {
              <button matSuffix mat-icon-button aria-label="Clear" (click)="resetTextInput()">
                <mat-icon>close</mat-icon>
              </button>
            }
            <mat-hint>{{ inputGroupMessage | translate: inputGroupParams }}</mat-hint>
          </mat-form-field>
        </form>
      </mat-card-content>
      <mat-card-actions>
        <span appValidityState [valid]="block.valid"></span>
      </mat-card-actions>
    </mat-card>`,
})
export class TextInputComponent implements OnInit, OnChanges, OnDestroy {
  @Input() block: TextInputBlock;
  @Output() valueDidChange: EventEmitter<string>;

  form: FormGroup;
  control: FormControl<string>;

  protected controlSubscription: Subscription;

  protected formBuilder = inject(FormBuilder);
  protected logger = inject(NGXLogger);

  constructor() {
    this.valueDidChange = new EventEmitter();
  }

  get isTextInputNotEmpty(): boolean {
    return !!this.control.value;
  }

  get inputGroupMessage(): string {
    if (this.block) {
      if (this.block.minLength !== undefined &&
        this.block.minLength >= 0 &&
        this.block.maxLength !== undefined &&
        this.block.maxLength >= 0) {
        return 'COMPONENT.TEXT_INPUT.TEXT_INPUT_MSG_MIN_MAX_LENGTH';
      } else if (this.block.minLength !== undefined && this.block.minLength >= 0) {
        return 'COMPONENT.TEXT_INPUT.TEXT_INPUT_MSG_MIN_LENGTH';
      } else if (this.block.maxLength !== undefined && this.block.maxLength >= 0) {
        return 'COMPONENT.TEXT_INPUT.TEXT_INPUT_MSG_MAX_LENGTH';
      } else {
        return ``;
      }
    }

    return '';
  }

  get inputGroupParams(): any {
    if (this.block) {
      if (this.block.minLength !== undefined &&
        this.block.minLength >= 0 &&
        this.block.maxLength !== undefined &&
        this.block.maxLength >= 0) {
        return {
          minLength: this.block.minLength,
          maxLength: this.block.maxLength,
        };
      } else if (this.block.minLength !== undefined && this.block.minLength >= 0) {
        return {
          minLength: this.block.minLength,
        };
      } else if (this.block.maxLength !== undefined && this.block.maxLength >= 0) {
        return {
          maxLength: this.block.maxLength,
        };
      } else {
        return undefined;
      }
    }

    return undefined;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      textInput: this.control = new FormControl(),
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

  resetTextInput(): void {
    this.control.setValue('');
  }

  protected setupController(): void {
    const validators = [
      ...this.insertIf(this.block.required, Validators.required),
      ...this.insertIf(
        this.block.minLength !== undefined && this.block.minLength >= 0,
        Validators.minLength(this.block.minLength as number),
      ),
      ...this.insertIf(
        this.block.maxLength !== undefined && this.block.maxLength >= 0,
        Validators.maxLength(this.block.maxLength as number),
      ),
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
