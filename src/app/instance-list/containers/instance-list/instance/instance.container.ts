import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { Instance } from '../../../models';

import { InstanceListStoreService } from '../instance-list-store.service';

@Component({
  selector: 'app-instance-ct',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-instance-cp
      [instance]="(instance$ | async)!"
      (instanceSelected)="goTo()">
    </app-instance-cp>
  `,
})
export class InstanceContainerComponent implements OnInit, OnDestroy {
  @Input() instanceId: string;

  instance$: Observable<Instance | undefined>;

  constructor(protected router: Router,
              protected instanceListStore: InstanceListStoreService) {
  }

  ngOnInit(): void {
    this.setupAsyncObs();
  }

  ngOnDestroy(): void {
  }

  goTo(): void {
    this.router.navigate(['/instance-detail', this.instanceId]);
  }

  protected setupAsyncObs(): void {
    this.instance$ = this.instanceListStore.getInstanceById(this.instanceId);
  }
}
