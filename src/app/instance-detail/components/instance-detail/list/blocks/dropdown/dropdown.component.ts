import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/debounceTime";

import { NGXLogger } from "ngx-logger";

import { DropdownBlock } from "../../../../../models";

@Component({
  selector: "cp-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"]
})
export class DropdownComponent implements OnInit, OnChanges, OnDestroy {
  @Input() block: DropdownBlock;
  @Input() loading: boolean;
  @Output() valueDidChange: EventEmitter<string>;

  dropdownForm: FormGroup;
  protected dropdownControl: FormControl;

  protected dropdownControlSubscription: Subscription;

  constructor(protected formBuilder: FormBuilder,
              protected logger: NGXLogger) {
    this.valueDidChange = new EventEmitter<string>();
  }

  get isLoading(): boolean {
    return this.loading === true;
  }

  ngOnInit(): void {
    const controlValue = {
      value: this.block.value,
      disabled: this.block.disabled
    };
    const options = [
      ...this.insertIf(this.block.required, Validators.required),
    ];

    this.dropdownForm = this.formBuilder.group({
      selectedValue: this.dropdownControl = new FormControl(controlValue, options),
    });

    this.subscribeToDropdownControlValueChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.block.isFirstChange()) {
      this.unsubscribeToDropdownControlValueChanges();
      this.dropdownControl.setValue(changes.block.currentValue.value);
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
      .debounceTime(500)
      .subscribe((value: any) => {
          this.valueDidChange.emit(value);
        },
        (e) => {
          this.logger.error(e.toString());
        });
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
