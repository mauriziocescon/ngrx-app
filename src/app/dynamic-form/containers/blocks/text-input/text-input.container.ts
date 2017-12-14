import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

import { TextInputBlock } from "../../../models";

@Component({
  selector: "ct-text-input",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<cp-text-input [block]="block"></cp-text-input>`,
})
export class TextInputContainerComponent {
  @Input() block: TextInputBlock;

  constructor() {
  }
}
