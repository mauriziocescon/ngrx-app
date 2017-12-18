import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

import { DropdownBlock } from "../../../models";

@Component({
  selector: "ct-dropdown",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-dropdown
      [block]="block"
      (valueDidChange)="valueDidChange($event)">
    </cp-dropdown>`,
})
export class DropdownContainerComponent {
  @Input() block: DropdownBlock;

  constructor() {
  }

  valueDidChange(value: string): void {
    console.log(`DropdownContainerComponent: ${JSON.stringify(value)}`);
  }
}
