import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { Instance } from '../../models';

import { InstanceListStoreService } from '../instance-list-store.service';

import { InstanceComponent } from './instance.component';

@Component({
  selector: 'app-instance-ct',
  standalone: true,
  imports: [
    CommonModule,
    InstanceComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-instance-cp
      [instance]="(instance$ | async)!"
      (instanceSelected)="goTo()">
    </app-instance-cp>`,
})
export class InstanceContainerComponent implements OnInit, OnDestroy {
  @Input() instanceId: string;

  instance$: Observable<Instance | undefined>;

  protected router = inject(Router);
  protected instanceListStore = inject(InstanceListStoreService);

  ngOnInit(): void {
    this.setupAsyncObs();
  }

  ngOnDestroy(): void {
  }

  goTo(): void {
    this.router.navigateByUrl(`/instance-detail/${this.instanceId}`);
  }

  protected setupAsyncObs(): void {
    this.instance$ = this.instanceListStore.getInstanceById(this.instanceId);
  }
}
