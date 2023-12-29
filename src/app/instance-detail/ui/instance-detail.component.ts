import { Component, OnInit, OnDestroy, inject, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Subscription } from 'rxjs';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { BlockListContainerComponent } from './block-list/block-list.container';
import { NextStepContainerComponent } from './next-step/next-step.container';

@Component({
  selector: 'app-instance-detail-cp',
  standalone: true,
  imports: [
    CommonModule,
    BlockListContainerComponent,
    NextStepContainerComponent,
  ],
  template: `
    <div class="instance-detail">
      <div [ngClass]="nextStep">
        <app-next-step-ct [instanceId]="instanceId"></app-next-step-ct>
      </div>
      <div [ngClass]="blockList">
        <app-block-list-ct [instanceId]="instanceId"></app-block-list-ct>
      </div>
    </div>`,
  styles: [`
    .instance-detail {
      display: flex;
      flex-flow: wrap;
      width: 100%;
    }

    .col-2 {
      flex: 0 0 auto;
      width: 16.66666667%;
    }

    .col-4 {
      flex: 0 0 auto;
      width: 33.33333333%;
    }

    .col-8 {
      flex: 0 0 auto;
      width: 66.66666667%;
    }

    .col-10 {
      flex: 0 0 auto;
      width: 83.33333333%;
    }

    .col-12 {
      flex: 0 0 auto;
      width: 100%;
    }
  `],
})
export class InstanceDetailComponent implements OnInit, OnDestroy {
  @Input() instanceId: string;

  nextStep: string;
  blockList: string;

  private cdRef = inject(ChangeDetectorRef);
  private breakpointObserver = inject(BreakpointObserver);
  private breakpointObserverSubscription: Subscription;

  ngOnInit(): void {
    this.subscribeAll();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  protected subscribeAll(): void {
    this.breakpointObserverSubscription = this.breakpointObserver
      .observe([Breakpoints.XLarge, Breakpoints.Large, Breakpoints.Small, Breakpoints.XSmall])
      .subscribe(state => {
        if (state.breakpoints[Breakpoints.XLarge]) {
          this.nextStep = 'col-2';
          this.blockList = 'col-10';
        } else if (state.breakpoints[Breakpoints.Large]) {
          this.nextStep = 'col-2';
          this.blockList = 'col-10';
        } else if (state.breakpoints[Breakpoints.Small]) {
          this.nextStep = 'col-12';
          this.blockList = 'col-12';
        } else if (state.breakpoints[Breakpoints.XSmall]) {
          this.nextStep = 'col-12';
          this.blockList = 'col-12';
        } else {
          this.nextStep = 'col-4';
          this.blockList = 'col-8';
        }
        this.cdRef.markForCheck();
      });
  }

  protected unsubscribeAll(): void {
    this.breakpointObserverSubscription?.unsubscribe();
  }
}
