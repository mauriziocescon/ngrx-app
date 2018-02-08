import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";

import * as fromHome from "../../reducers";

import { Instance } from "../../models";

@Component({
  selector: "ct-home",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-home
      [instances]="instances$ | async"
      [loading]="loading$ | async"
      [error]="error$ | async"
      (reloadList)="reloadList()">
    </cp-home>
  `,
})
export class HomeContainerComponent {
  instances$: Observable<Instance[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(protected store: Store<fromHome.State>) {
    this.instances$ = this.store.select(fromHome.getFetchedInstancesState);
    this.loading$ = this.store.select(fromHome.getFetchLoadingState;
    this.error$ = this.store.select(fromHome.getFetchErrorState);
  }

  reloadList(): void {

  }
}
