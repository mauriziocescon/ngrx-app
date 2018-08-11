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
        <ct-info
          class="col-12"
          [instance]="instance">
        </ct-info>
        <ct-next-step
          class="col-12 col-sm-4 col-lg-2"
          [instance]="instance">
        </ct-next-step>
        <ct-tabs
          class="col-12 col-sm-8 col-lg-10"
          [instance]="instance">
        </ct-tabs>
      </div>
    </div>`,
})
export class InstanceDetailPageComponent implements OnInit, OnDestroy {
  instance: string;

  constructor(protected route: ActivatedRoute,
              protected instanceDetailPageStore: InstanceDetailPageStoreService) {
  }

  ngOnInit(): void {
    this.instanceDetailPageStore.startEffects();
    this.instance = this.route.snapshot.paramMap.get('instance');
  }

  canDeactivate(): Observable<boolean> {
    return this.instanceDetailPageStore.isSynchronizationRequired()
      .pipe(
        map(requireSync => !requireSync),
      );
  }

  ngOnDestroy(): void {
    this.instanceDetailPageStore.clearBlocks();
    this.instanceDetailPageStore.stopEffects();
  }
}
