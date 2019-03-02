import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
        <ct-next-step
          class="col-12 col-sm-4 col-lg-2"
          [instanceId]="instanceId">
        </ct-next-step>
        <ct-block-list
          class="col-12 col-sm-8 col-lg-10"
          [instanceId]="instanceId">
        </ct-block-list>
      </div>
    </div>`,
})
export class InstanceDetailPageComponent implements OnInit, OnDestroy {
  instanceId: string;

  constructor(protected route: ActivatedRoute,
              protected instanceDetailPageStore: InstanceDetailPageStoreService) {
  }

  ngOnInit(): void {
    this.instanceDetailPageStore.startEffects();
    this.instanceId = this.route.snapshot.paramMap.get('id');
  }

  canDeactivate(): boolean {
    // return this.instanceDetailPageStore.isSyncRequired()
    //   .pipe(
    //     map(requireSync => !requireSync),
    //   );
    return true;
  }

  ngOnDestroy(): void {
    this.instanceDetailPageStore.stopEffects();
  }
}
