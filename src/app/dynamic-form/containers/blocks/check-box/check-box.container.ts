import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

@Component({
  selector: "ct-check-box",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<cp-check-box [block]="block"></cp-check-box>`,
})
export class CheckBoxContainerComponent {
  @Input() block: any;

  constructor() {
  }
}
