import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';

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

  protected subscribeToSearchControlValueChanges(): void {
    this.unsubscribeToSearchControlValueChanges();

    this.searchControlSubscription = this.searchControl
      .valueChanges
      .debounceTime(1000)
      .subscribe((value: string) => {
          this.valueDidChange.emit(value);
        },
        (e) => {
          this.logger.error(e.toString());
        });
  }

  resetTextFilter(): void {
    this.searchControl.setValue('');
  }

  protected unsubscribeToSearchControlValueChanges(): void {
    if (this.searchControlSubscription) {
      this.searchControlSubscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeToSearchControlValueChanges();
  }
}
