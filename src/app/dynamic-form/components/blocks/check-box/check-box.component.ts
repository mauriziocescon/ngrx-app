import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";

import { CheckBoxBlock } from "../../../models";

@Component({
  selector: "cp-check-box",
  templateUrl: "./check-box.component.html",
  styleUrls: ["./check-box.component.scss"]
})
export class CheckBoxComponent implements OnInit {
  @Input() block: CheckBoxBlock;

  public checkBoxForm: FormGroup;
  protected checkBoxControl: FormControl;

  constructor(protected formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.checkBoxForm = this.formBuilder.group({
      checkBox: this.checkBoxControl = new FormControl(this.block.value),
    });
  }
}
