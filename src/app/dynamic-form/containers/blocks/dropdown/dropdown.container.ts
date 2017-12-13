import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

@Component({
  selector: "ct-dropdown",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<cp-dropdown [block]="block"></cp-dropdown>`,
})
export class DropdownContainerComponent {
  @Input() block: any;

  constructor() {
  }
}
