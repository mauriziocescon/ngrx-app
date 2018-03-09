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
      .debounceTime(500)
      .subscribe((value: any) => {
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
