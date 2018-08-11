import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { NGXLogger } from 'ngx-logger';

import { DropdownBlock } from '../../models';

@Component({
  selector: 'cp-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit, OnChanges, OnDestroy {
  @Input() block: DropdownBlock;
  @Output() valueDidChange: EventEmitter<string>;

  dropdownForm: FormGroup;
  protected dropdownControl: FormControl;

  protected dropdownControlSubscription: Subscription;

  constructor(protected formBuilder: FormBuilder,
              protected logger: NGXLogger) {
    this.valueDidChange = new EventEmitter<string>();
  }

  ngOnInit(): void {
    this.dropdownForm = this.formBuilder.group({
      selectedValue: this.dropdownControl = new FormControl(),
    });
    this.setupFormControllers();

    this.subscribeToDropdownControlValueChanges();
  }

  protected setupFormControllers(): void {
    const validators = [
      ...this.insertIf(this.block.required, Validators.required),
    ];
    this.dropdownControl.setValue(this.block.value);
    this.setDisableEnable(this.block.disabled, this.dropdownControl);
    this.dropdownControl.setValidators(validators);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.block.isFirstChange()) {
      this.unsubscribeToDropdownControlValueChanges();
      this.setupFormControllers();
      this.subscribeToDropdownControlValueChanges();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeToDropdownControlValueChanges();
  }

  protected subscribeToDropdownControlValueChanges(): void {
    this.unsubscribeToDropdownControlValueChanges();

    this.dropdownControlSubscription = this.dropdownControl
      .valueChanges
      .pipe(
        debounceTime(500),
      )
      .subscribe((value: string) => {
          this.valueDidChange.emit(value);
        },
        (e) => {
          this.logger.error(e.toString());
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

  protected unsubscribeToDropdownControlValueChanges(): void {
    if (this.dropdownControlSubscription) {
      this.dropdownControlSubscription.unsubscribe();
    }
  }
}
