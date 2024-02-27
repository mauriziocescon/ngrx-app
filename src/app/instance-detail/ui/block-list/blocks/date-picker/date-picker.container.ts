import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs';

import { BlockComponent } from '../../../../../shared';

import { DatePickerBlock } from '../../../../models';

import { InstanceDetailStoreService } from '../../../instance-detail-store.service';

import { DatePickerComponent } from './date-picker.component';

@Component({
  selector: 'app-date-picker-ct',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePickerComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-date-picker-cp
      [block]="(block$ | async)!"
      (valueDidChange)="valueDidChange($event)">
    </app-date-picker-cp>`,
})
export class DatePickerContainerComponent implements BlockComponent, OnInit, OnDestroy {
  @Input() blockId: string;

  block$: Observable<DatePickerBlock | undefined>;

  private instanceDetailStore = inject(InstanceDetailStoreService);

  ngOnInit(): void {
    this.setupAsyncObs();
  }

  ngOnDestroy(): void {
  }

  valueDidChange(value: string): void {
    this.updateBlock(value);
  }

  private updateBlock(value: string): void {
    const block: Update<DatePickerBlock> = {
      id: this.blockId,
      changes: {
        value,
      },
    };
    this.instanceDetailStore.updateBlock(block);
  }

  private setupAsyncObs(): void {
    this.block$ = this.instanceDetailStore.getBlockById(this.blockId) as Observable<DatePickerBlock>;
  }
}
