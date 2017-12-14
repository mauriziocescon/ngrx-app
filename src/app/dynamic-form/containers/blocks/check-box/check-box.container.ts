import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

import { CheckBoxBlock } from "../../../models";

@Component({
  selector: "ct-check-box",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<cp-check-box [block]="block"></cp-check-box>`,
})
export class CheckBoxContainerComponent {
  @Input() block: CheckBoxBlock;

  constructor() {
  }
}
