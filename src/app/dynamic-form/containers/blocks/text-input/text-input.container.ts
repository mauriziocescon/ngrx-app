import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

@Component({
  selector: "ct-text-input",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<cp-text-input [block]="block"></cp-text-input>`,
})
export class TextInputContainerComponent {
  @Input() block: any;

  constructor() {
  }
}
