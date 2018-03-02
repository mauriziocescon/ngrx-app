import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { InstanceParams } from "../../models";

import { InstanceParamsService } from "../../services";
import { InstanceDetailIntegrationStoreService } from "../../services";

@Component({
  selector: "ct-instance-detail",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container-fluid">
      <div class="row">
        <ct-next-step
          class="col-12 col-sm-4 col-lg-2"
          [instanceParams]="routeParams">
        </ct-next-step>
        <ct-list
          class="col-12 col-sm-8 col-lg-10"
          [instanceParams]="routeParams">
        </ct-list>
      </div>
    </div>`,
})
export class InstanceDetailContainerComponent implements OnInit {
  routeParams: InstanceParams;

  constructor(protected instanceDetailStore: InstanceDetailIntegrationStoreService,
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
