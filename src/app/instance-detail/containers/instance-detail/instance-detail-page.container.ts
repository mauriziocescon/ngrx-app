import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BlockListStoreService } from './block-list-store.service';
import { CoreStoreService } from './core-store.service';
import { EffectsStoreService } from './effects-store.service';
import { SyncStoreService } from './sync-store.service';

@Component({
  selector: 'ct-instance-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    BlockListStoreService,
    CoreStoreService,
    EffectsStoreService,
    SyncStoreService,
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
              protected effectsStore: EffectsStoreService) {
  }

  ngOnInit(): void {
    this.effectsStore.startEffects();
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
    this.effectsStore.stopEffects();
  }
}
