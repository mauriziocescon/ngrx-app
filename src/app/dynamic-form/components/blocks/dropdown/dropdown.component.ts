import { Component, Input } from "@angular/core";

import { Block } from "../../../models/block.model";

@Component({
  selector: "cp-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"]
})
export class DropdownComponent {
  @Input() block: Block;

  constructor() {
  }
}
