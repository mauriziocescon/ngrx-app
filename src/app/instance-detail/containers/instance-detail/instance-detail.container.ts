import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { InstanceParams } from "../../models";

import { InstanceDetailStoreService } from "./instance-detail-store.service";

@Component({
  selector: "ct-instance-detail",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    InstanceDetailStoreService,
  ],
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
  routeParams: InstanceParams;
  protected paramMapSubscription: Subscription;

  constructor(protected route: ActivatedRoute,
              protected instanceDetailStore: InstanceDetailStoreService) {
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
    return this.instanceDetailStore.isSynchronizationRequired()
      .map(requireSync => !requireSync);
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
