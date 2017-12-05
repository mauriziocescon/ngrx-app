import { Component, Input } from "@angular/core";

import { Block } from "../../../models/block.model";

@Component({
  selector: "cp-check-box",
  templateUrl: "./check-box.component.html",
  styleUrls: ["./check-box.component.scss"]
})
export class CheckBoxComponent {
  @Input() block: Block;

  constructor() {
  }
}
