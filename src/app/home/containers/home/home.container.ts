import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";

import * as home from "../../actions/home.actions";

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
      (reloadList)="reloadList()"
      (goTo)="goTo($event)">
    </cp-home>
  `,
})
export class HomeContainerComponent {
  instances$: Observable<Instance[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(protected store: Store<fromHome.State>,
              protected router: Router,) {
    this.instances$ = this.store.select(fromHome.getFetchedInstancesState);
    this.loading$ = this.store.select(fromHome.getFetchLoadingState;
    this.error$ = this.store.select(fromHome.getFetchErrorState);
  }

  reloadList(): void {
    this.store.dispatch(new home.FetchInstances());
  }

  goTo(instance: Instance): void {
    this.router.navigate(["/dyn-blocks-list", instance.module, instance.instance, instance.step]);
  }
}
