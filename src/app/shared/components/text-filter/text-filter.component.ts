import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'cp-text-filter',
  templateUrl: './text-filter.component.html',
  styleUrls: ['./text-filter.component.scss'],
})
export class TextFilterComponent implements OnInit, OnDestroy {
  @Output() valueDidChange: EventEmitter<string>;

  searchForm: FormGroup;
  protected searchControl: FormControl;

  protected searchControlSubscription: Subscription;

  constructor(protected formBuilder: FormBuilder,
              protected logger: NGXLogger) {
    this.valueDidChange = new EventEmitter<string>();
  }

  get isTextFilterNotEmpty(): boolean {
    return this.searchControl.value;
  }

  ngOnInit() {
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
      .pipe(
        debounceTime(1000),
      )
      .subscribe((value: string) => {
          this.valueDidChange.emit(value);
        },
        (e) => {
          this.logger.error(e.toString());
        });
  }

  protected unsubscribeToSearchControlValueChanges(): void {
    if (this.searchControlSubscription) {
      this.searchControlSubscription.unsubscribe();
    }
  }
}
