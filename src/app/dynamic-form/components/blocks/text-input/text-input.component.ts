import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";

import { TextInputBlock } from "../../../models";

@Component({
  selector: "cp-text-input",
  templateUrl: "./text-input.component.html",
  styleUrls: ["./text-input.component.scss"]
})
export class TextInputComponent implements OnInit {
  @Input() block: TextInputBlock;

  public textInputForm: FormGroup;
  protected  textInputControl: FormControl;

  constructor(protected formBuilder: FormBuilder) {
  }

  public get isTextInputNotEmpty(): boolean {
    return this.textInputControl.value;
  }

  ngOnInit(): void {
    this.textInputForm = this.formBuilder.group({
      textInput: this.textInputControl = new FormControl(this.block.value),
    });
  }

  public resetTextInput(): void {
    this.textInputControl.setValue("");
  }
}
