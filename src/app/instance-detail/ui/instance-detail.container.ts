import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { InstanceDetailComponent } from './instance-detail.component';
import { BlockListContainerComponent } from './block-list/block-list.container';
import { NextStepContainerComponent } from './next-step/next-step.container';

import { InstanceDetailStoreService } from './instance-detail-store.service';

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
    InstanceDetailStoreService,
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
  private instanceDetailStore = inject(InstanceDetailStoreService);

  private canDeactivateSubscription: Subscription;

  ngOnInit(): void {
    this.instanceDetailStore.startEffects();
    this.instanceId = this.route.snapshot.paramMap.get('id') as string;
    this.subscribeAll();
  }

  ngOnDestroy(): void {
    this.instanceDetailStore.stopEffects();
    this.unsubscribeAll();
  }

  private subscribeAll(): void {
    this.canDeactivateSubscription = this.instanceDetailStore.isSyncRequired()
      .pipe(map(requireSync => !requireSync))
      .subscribe(v => this.canDeactivate = v);
  }

  private unsubscribeAll(): void {
    this.canDeactivateSubscription?.unsubscribe();
  }
}
