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
        <app-next-step-ct
          class="col-12 col-sm-4 col-lg-2"
          [instanceId]="instanceId">
        </app-next-step-ct>
        <app-block-list-ct
          class="col-12 col-sm-8 col-lg-10"
          [instanceId]="instanceId">
        </app-block-list-ct>
      </div>
    </div>`,
})
export class InstanceDetailPageComponent implements OnInit, OnDestroy {
  instanceId: string;

  constructor(protected route: ActivatedRoute,
              protected effectsStore: EffectsStoreService,
              protected syncStore: SyncStoreService) {
  }

  ngOnInit(): void {
    this.effectsStore.startEffects();
    this.instanceId = this.route.snapshot.paramMap.get('id');
  }

  ngOnDestroy(): void {
    this.effectsStore.stopEffects();
  }

  canDeactivate(): Observable<boolean> {
    return this.syncStore.isSyncRequired()
      .pipe(
        map(requireSync => !requireSync),
      );
  }
}
