import { Component, Input } from "@angular/core";

import { Block } from "../../../models/block.model";

@Component({
  selector: "cp-text-input",
  templateUrl: "./text-input.component.html",
  styleUrls: ["./text-input.component.scss"]
})
export class TextInputComponent {
  @Input() block: Block;

  constructor() {
  }
}
