import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { Observable } from 'rxjs';
import { Update } from '@ngrx/entity';

import { BlockComponent } from '../../../../../shared';

import { TextInputBlock } from '../../../../models';

import { InstanceDetailStoreService } from '../../../instance-detail-store.service';

import { TextInputComponent } from './text-input.component';

@Component({
  selector: 'app-text-input-ct',
  standalone: true,
  imports: [
    AsyncPipe,
    TextInputComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-text-input-cp
      [block]="(block$ | async)!"
      (valueDidChange)="valueDidChange($event)">
    </app-text-input-cp>`,
})
export class TextInputContainerComponent implements BlockComponent, OnInit, OnDestroy {
  @Input() blockId: string;

  block$: Observable<TextInputBlock | undefined>;

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
    const block: Update<TextInputBlock> = {
      id: this.blockId,
      changes: {
        value,
      },
    };
    this.instanceDetailStore.updateBlock(block);
  }

  private setupAsyncObs(): void {
    this.block$ = this.instanceDetailStore.getBlockById(this.blockId) as Observable<TextInputBlock>;
  }
}
