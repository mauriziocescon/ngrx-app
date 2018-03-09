import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

import { InstanceParams } from "../../../models";

@Component({
  selector: "ct-info",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-info>
    </cp-info>`,
})
export class InfoContainerComponent {
  @Input() instanceParams: InstanceParams;

  constructor() {
  }
}
