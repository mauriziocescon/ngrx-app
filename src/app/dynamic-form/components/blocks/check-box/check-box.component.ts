import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";

import "rxjs/add/operator/debounceTime";

import { CheckBoxBlock } from "../../../models";

@Component({
  selector: "cp-check-box",
  templateUrl: "./check-box.component.html",
  styleUrls: ["./check-box.component.scss"]
})
export class CheckBoxComponent implements OnInit, OnDestroy {
  @Input() block: CheckBoxBlock;
  @Output() valueDidChange: EventEmitter<boolean>;

  checkBoxForm: FormGroup;
  protected checkBoxControl: FormControl;

  protected checkBoxControlSubscription: any;

  constructor(protected formBuilder: FormBuilder) {
    this.valueDidChange = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    this.checkBoxForm = this.formBuilder.group({
      checkBox: this.checkBoxControl = new FormControl(this.block.value),
    });

    this.checkBoxControlValueSubscription();
  }

  ngOnDestroy(): void {
    if (this.checkBoxControlSubscription) {
      this.checkBoxControlSubscription.unsubscribe();
    }
  }

  checkBoxControlValueSubscription(): void {
    if (this.checkBoxControlSubscription) {
      this.checkBoxControlSubscription.unsubscribe();
    }

    this.checkBoxControlSubscription = this.checkBoxControl
      .valueChanges
      .debounceTime(500)
      .subscribe((value: any) => {
          this.valueDidChange.emit(value);
        },
        (err: any) => {
          console.log(JSON.stringify(err));
        });
  }
}
