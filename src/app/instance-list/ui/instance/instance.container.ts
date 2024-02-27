import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Input, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { Instance } from '../../models';

import { InstanceListStoreService } from '../instance-list-store.service';

import { InstanceComponent } from './instance.component';

@Component({
  selector: 'app-instance-ct',
  standalone: true,
  imports: [
    AsyncPipe,
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

  private router = inject(Router);
  private instanceListStore = inject(InstanceListStoreService);

  ngOnInit(): void {
    this.setupAsyncObs();
  }

  ngOnDestroy(): void {
  }

  goTo(): void {
    this.router.navigateByUrl(`/instance-detail/${this.instanceId}`);
  }

  private setupAsyncObs(): void {
    this.instance$ = this.instanceListStore.getInstanceById(this.instanceId);
  }
}
