import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";

import { DropdownBlock } from "../../../models";

@Component({
  selector: "cp-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"]
})
export class DropdownComponent implements OnInit {
  @Input() block: DropdownBlock;

  public dropdownForm: FormGroup;
  protected dropdownControl: FormControl;

  constructor(protected formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.dropdownForm = this.formBuilder.group({
      selectedValue: this.dropdownControl = new FormControl(this.block.value),
    });
  }
}
