import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";

import * as fromInstanceDetail from "../../reducers";

@Component({
  selector: "ct-instance-detail",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-instance-detail>
    </cp-instance-detail>`,
})
export class InstanceDetailContainerComponent {

  constructor(protected store$: Store<fromInstanceDetail.State>) {
  }

  canDeactivate(): Observable<boolean> {
    return this.store$.select(fromInstanceDetail.isSynchronizationRequiredState).map(requireSync => !requireSync);
  }
}
