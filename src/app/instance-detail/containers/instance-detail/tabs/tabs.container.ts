import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

import { InstanceParams } from "../../../models";

@Component({
  selector: "ct-tabs",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-tabs
      [instanceParams]="instanceParams">
    </cp-tabs>`,
})
export class TabsContainerComponent {
  @Input() instanceParams: InstanceParams;

  constructor() {
  }
}
