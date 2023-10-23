import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { BlockListStoreService } from './block-list-store.service';
import { EffectsStoreService } from './effects-store.service';
import { SyncStoreService } from './sync-store.service';

@Component({
  selector: 'app-instance-detail-ct',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    BlockListStoreService,
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
export class InstanceDetailContainerComponent implements OnInit, OnDestroy {
  instanceId: string;
  canDeactivate: boolean;

  protected canDeactivateSubscription: Subscription;

  constructor(protected route: ActivatedRoute,
              protected effectsStore: EffectsStoreService,
              protected syncStore: SyncStoreService) {
  }

  ngOnInit(): void {
    this.effectsStore.startEffects();
    this.instanceId = this.route.snapshot.paramMap.get('id') as string;
    this.subscribeAll();
  }

  ngOnDestroy(): void {
    this.effectsStore.stopEffects();
    this.unsubscribeAll();
  }

  protected subscribeAll(): void {
    this.canDeactivateSubscription = this.syncStore.isSyncRequired()
      .pipe(map(requireSync => !requireSync))
      .subscribe(v => this.canDeactivate = v);
  }

  protected unsubscribeAll(): void {
    this.canDeactivateSubscription?.unsubscribe();
  }
}
