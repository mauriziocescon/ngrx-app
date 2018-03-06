import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { InstanceParams } from "../../models";

import { InstanceParamsService } from "../../services";
import {
  InstanceDetailIntegrationStoreService,
  BlockHooksIntegrationService,
} from "../../services";

import { InstanceDetailPageStoreService } from "./instance-detail-page-store.service";

@Component({
  selector: "ct-instance-detail",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    InstanceDetailPageStoreService,
  ],
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
export class InstanceDetailPageComponent implements OnInit, OnDestroy {
  routeParams: InstanceParams;

  constructor(protected instanceDetailPageStore: InstanceDetailPageStoreService,
              protected instanceDetailStore: InstanceDetailIntegrationStoreService,
              protected instanceParams: InstanceParamsService,
              protected blockHooks: BlockHooksIntegrationService) {
  }

  ngOnInit(): void {
    this.instanceDetailStore.dispatchStartEffects();
    this.routeParams = this.instanceParams.getInstanceParams();
  }

  canDeactivate(): Observable<boolean> {
    return this.instanceDetailPageStore.isSynchronizationRequired()
      .map(requireSync => !requireSync);
  }

  ngOnDestroy(): void {
    this.instanceDetailPageStore.dispatchClearBlocks();
    this.blockHooks.unsubscribeAll();
    this.instanceDetailStore.dispatchStopEffects();
  }
}
