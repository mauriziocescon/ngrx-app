import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

import { TextInputBlock } from "../../../models";

@Component({
  selector: "ct-text-input",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-text-input
      [block]="block"
      (valueDidChange)="valueDidChange($event)">
    </cp-text-input>`,
})
export class TextInputContainerComponent {
  @Input() block: TextInputBlock;

  constructor() {
  }

  valueDidChange(value: string): void {
    console.log(`TextInputContainerComponent: ${JSON.stringify(value)}`);
  }
}
