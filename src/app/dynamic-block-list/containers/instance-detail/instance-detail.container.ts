import { Component, ChangeDetectionStrategy } from "@angular/core";

import { Observable } from "rxjs/Observable";

@Component({
  selector: "ct-instance-detail",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-instance-detail>
    </cp-instance-detail>`,
})
export class InstanceDetailContainerComponent {

  constructor() {
  }

  canDeactivate(): Observable<boolean> {

  }
}
