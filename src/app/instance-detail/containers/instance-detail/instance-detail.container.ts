import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { InstanceParams } from "../../models";

import * as fromInstanceDetail from "../../reducers";

@Component({
  selector: "ct-instance-detail",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container-fluid">
      <div class="row">
        <ct-next-step
          class="col-12 col-sm-2 col-lg-1"
          [instanceParams]="routeParams">
        </ct-next-step>
        <ct-list
          class="col-12 col-sm-10 col-lg-11"
          [instanceParams]="routeParams">
        </ct-list>
      </div>
    </div>`,
})
export class InstanceDetailContainerComponent implements OnInit, OnDestroy {
  protected routeParams: InstanceParams;
  protected paramMapSubscription: Subscription;

  constructor(protected store$: Store<fromInstanceDetail.State>,
              protected route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscribeToParamMap();
  }

  protected subscribeToParamMap(): void {
    this.paramMapSubscription = this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        this.routeParams = {
          module: paramMap.get("module"),
          instance: paramMap.get("instance"),
          step: paramMap.get("step"),
        };
      });
  }

  canDeactivate(): Observable<boolean> {
    return this.store$.select(fromInstanceDetail.isSynchronizationRequiredState).map(requireSync => !requireSync);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  protected unsubscribeAll(): void {
    if (this.paramMapSubscription) {
      this.paramMapSubscription.unsubscribe();
    }
  }
}
