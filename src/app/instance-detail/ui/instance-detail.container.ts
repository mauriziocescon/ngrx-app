import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { InstanceDetailComponent } from './instance-detail.component';
import { BlockListContainerComponent } from './block-list/block-list.container';
import { NextStepContainerComponent } from './next-step/next-step.container';

import { BlockListStoreService } from './block-list-store.service';
import { EffectsStoreService } from './effects-store.service';
import { SyncStoreService } from './sync-store.service';

@Component({
  selector: 'app-instance-detail-ct',
  standalone: true,
  imports: [
    InstanceDetailComponent,
    BlockListContainerComponent,
    NextStepContainerComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    BlockListStoreService,
    EffectsStoreService,
    SyncStoreService,
  ],
  template: `
      <app-instance-detail-cp
              [instanceId]="instanceId">
      </app-instance-detail-cp>`,
})
export class InstanceDetailContainerComponent implements OnInit, OnDestroy {
  instanceId: string;
  canDeactivate: boolean;

  private route = inject(ActivatedRoute);
  private effectsStore = inject(EffectsStoreService);
  private syncStore = inject(SyncStoreService);

  private canDeactivateSubscription: Subscription;

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
