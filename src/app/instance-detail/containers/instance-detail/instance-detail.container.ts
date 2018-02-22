import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { InstanceParams } from "../../models";

import { InstanceDetailStoreService } from "./instance-detail-store.service";
import { InstanceParamsService } from "../../services";

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
export class InstanceDetailContainerComponent implements OnInit {
  routeParams: InstanceParams;

  constructor(protected instanceDetailStore: InstanceDetailStoreService,
              protected instanceParams: InstanceParamsService) {
  }

  ngOnInit(): void {
    this.routeParams = this.instanceParams.getInstanceParams();
  }

  canDeactivate(): Observable<boolean> {
    return this.instanceDetailStore.isSynchronizationRequired()
      .map(requireSync => !requireSync);
  }
}