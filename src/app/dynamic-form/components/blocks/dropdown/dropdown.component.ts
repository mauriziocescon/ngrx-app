import { Component, Input } from "@angular/core";

import { DropdownBlock } from "../../../models";

@Component({
  selector: "cp-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"]
})
export class DropdownComponent {
  @Input() block: DropdownBlock;

  constructor() {
  }
}
