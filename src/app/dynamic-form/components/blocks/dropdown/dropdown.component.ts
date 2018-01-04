import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

import "rxjs/add/operator/debounceTime";

import { DropdownBlock } from "../../../models";

@Component({
  selector: "cp-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"]
})
export class DropdownComponent implements OnInit, OnDestroy {
  @Input() block: DropdownBlock;

  @Output() valueDidChange: EventEmitter<string>;

  dropdownForm: FormGroup;
  protected dropdownControl: FormControl;

  protected dropdownControlSubscription: any;

  constructor(protected formBuilder: FormBuilder) {
    this.valueDidChange = new EventEmitter<string>();
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

    this.dropdownControlValueSubscription();
  }

  ngOnDestroy(): void {
    if (this.dropdownControlSubscription) {
      this.dropdownControlSubscription.unsubscribe();
    }
  }

  dropdownControlValueSubscription(): void {
    if (this.dropdownControlSubscription) {
      this.dropdownControlSubscription.unsubscribe();
    }

    this.dropdownControlSubscription = this.dropdownControl
      .valueChanges
      .debounceTime(500)
      .subscribe((value: any) => {
          this.valueDidChange.emit(value);
        },
        (err: any) => {
          console.log(JSON.stringify(err));
        });
  }

  insertIf(condition: boolean, element: any): any[] {
    return condition ? [element] : [];
  }
}
