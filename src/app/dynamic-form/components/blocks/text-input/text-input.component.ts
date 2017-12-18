import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";

import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/takeLast";

import { TextInputBlock } from "../../../models";

@Component({
  selector: "cp-text-input",
  templateUrl: "./text-input.component.html",
  styleUrls: ["./text-input.component.scss"]
})
export class TextInputComponent implements OnInit, OnDestroy {
  @Input() block: TextInputBlock;
  @Output() valueDidChange: EventEmitter<string>;

  public textInputForm: FormGroup;
  protected textInputControl: FormControl;

  protected textInputControlSubscription: any;

  constructor(protected formBuilder: FormBuilder) {
    this.valueDidChange = new EventEmitter<string>();
  }

  get isTextInputNotEmpty(): boolean {
    return this.textInputControl.value;
  }

  ngOnInit(): void {
    this.textInputForm = this.formBuilder.group({
      textInput: this.textInputControl = new FormControl(this.block.value),
    });

    this.textInputControlValueSubscription();
  }

  ngOnDestroy(): void {
    if (this.textInputControlSubscription) {
      this.textInputControlSubscription.unsubscribe();
    }
  }

  textInputControlValueSubscription(): void {
    if (this.textInputControlSubscription) {
      this.textInputControlSubscription.unsubscribe();
    }

    this.textInputControlSubscription = this.textInputControl
      .valueChanges
      .debounceTime(500)
      // .takeLast(1)
      .subscribe((value: any) => {
          this.valueDidChange.emit(value);
        },
        (err: any) => {
          console.log(JSON.stringify(err));
        });
  }

  public resetTextInput(): void {
    this.textInputControl.setValue("");
  }
}
