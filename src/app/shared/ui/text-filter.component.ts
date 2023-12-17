import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { NgIf } from '@angular/common';
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
    NgIf,
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
              <input matInput type="search" formControlName="textFilter">
              <!--ng-container *ngIf="isTextFilterNotEmpty">
                  <button matSuffix mat-icon-button aria-label="Clear" (click)="resetTextFilter()">
                      <mat-icon>close</mat-icon>
                  </button>
              </ng-container-->
          </mat-form-field>
      </form>`,
  styles: [`
    .search-field {
      width: 100%;
    }
  `],
})
export class TextFilterComponent implements OnInit, OnDestroy {
  @Output() valueDidChange: EventEmitter<string>;

  searchForm: FormGroup;
  private searchControl: FormControl<string>;

  private searchControlSubscription: Subscription;

  constructor(protected formBuilder: FormBuilder,
              protected logger: NGXLogger) {
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
