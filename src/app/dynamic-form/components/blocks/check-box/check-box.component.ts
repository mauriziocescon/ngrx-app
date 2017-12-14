import { Component, Input } from "@angular/core";

import { CheckBoxBlock } from "../../../models";

@Component({
  selector: "cp-check-box",
  templateUrl: "./check-box.component.html",
  styleUrls: ["./check-box.component.scss"]
})
export class CheckBoxComponent {
  @Input() block: CheckBoxBlock;

  constructor() {
  }
}
