import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { InstanceParams } from '../../models';

import { InstanceParamsService } from '../../services';
import {
  InstanceDetailIntegrationStoreService,
  BlockHooksIntegrationService,
} from '../../services';

import { InstanceDetailPageStoreService } from './instance-detail-page-store.service';

@Component({
  selector: 'ct-instance-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    InstanceDetailPageStoreService,
  ],
  template: `
    <div class="container-fluid">
      <div class="row">
        <ct-info
          class="col-12"
          [instanceParams]="routeParams">
        </ct-info>
        <ct-next-step
          class="col-12 col-sm-4 col-lg-2"
          [instanceParams]="routeParams">
        </ct-next-step>
        <ct-tabs
          class="col-12 col-sm-8 col-lg-10"
          [instanceParams]="routeParams">
        </ct-tabs>
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
      .pipe(
        map(requireSync => !requireSync),
      );
  }

  ngOnDestroy(): void {
    this.instanceDetailPageStore.dispatchClearBlocks();
    this.blockHooks.unsubscribeAll();
    this.instanceDetailStore.dispatchStopEffects();
  }
}
