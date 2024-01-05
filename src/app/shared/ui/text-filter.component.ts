import { Component, EventEmitter, OnInit, OnDestroy, Output, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-text-filter-cp',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    TranslateModule,
  ],
  template: `
    <form [formGroup]="searchForm">
      <mat-form-field appearance="outline" class="search-field">
        <mat-label>{{ 'COMPONENT.TEXT_FILTER.PLACEHOLDER' | translate }}</mat-label>
        <input matInput type="text" formControlName="textFilter">
        @if (isTextFilterNotEmpty) {
          <button matSuffix mat-icon-button aria-label="Clear" (click)="resetTextFilter()">
            <mat-icon>close</mat-icon>
          </button>
        }
      </mat-form-field>
    </form>`,
  styles: [`
    .search-field {
      display: flex;
      padding-left: var(--padding-s);
      padding-right: var(--padding-s);
      padding-top: var(--padding-m);
      padding-bottom: var(--padding-m);
    }
  `],
})
export class TextFilterComponent implements OnInit, OnDestroy {
  @Output() valueDidChange: EventEmitter<string>;

  searchForm: FormGroup;
  protected searchControl: FormControl<string>;

  protected searchControlSubscription: Subscription;

  protected formBuilder = inject(FormBuilder);
  protected logger = inject(NGXLogger);

  constructor() {
    this.valueDidChange = new EventEmitter<string>();
  }

  get isTextFilterNotEmpty(): boolean {
    return this.searchControl.value !== undefined;
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      textFilter: this.searchControl = new FormControl(''),
    });

    this.subscribeToSearchControlValueChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribeToSearchControlValueChanges();
  }

  resetTextFilter(): void {
    this.searchControl.setValue('');
  }

  protected subscribeToSearchControlValueChanges(): void {
    this.unsubscribeToSearchControlValueChanges();

    this.searchControlSubscription = this.searchControl
      .valueChanges
      .pipe(debounceTime(1000))
      .subscribe({
        next: value => this.valueDidChange.emit(value),
        error: e => this.logger.error(e.toString()),
      });
  }

  protected unsubscribeToSearchControlValueChanges(): void {
    this.searchControlSubscription?.unsubscribe();
  }
}
