import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

import { CheckBoxBlock } from "../../../models";

@Component({
  selector: "ct-check-box",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-check-box
      [block]="block"
      (valueDidChange)="valueDidChange($event)">
    </cp-check-box>`,
})
export class CheckBoxContainerComponent {
  @Input() block: CheckBoxBlock;

  constructor() {
  }

  valueDidChange(value: boolean): void {
    console.log(`CheckBoxContainerComponent: ${JSON.stringify(value)}`);
  }
}
