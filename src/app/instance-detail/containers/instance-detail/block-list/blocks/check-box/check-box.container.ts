import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';

import { BlockComponent } from '../../../../../../shared/shared.module';

import { CheckBoxBlock } from '../../../../../models';

import { CheckBoxStoreService } from './check-box.store.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'ct-check-box',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    CheckBoxStoreService,
  ],
  template: `
    <cp-check-box
      [block]="block$ | async"
      (valueDidChange)="valueDidChange($event)">
    </cp-check-box>`,
})
export class CheckBoxContainerComponent implements BlockComponent, OnInit, OnDestroy {
  @Input() blockId: string;

  block$: Observable<CheckBoxBlock | undefined>;

  constructor(protected checkBoxStore: CheckBoxStoreService) {
  }

  ngOnInit(): void {
    this.setupAsyncObs();
  }

  ngOnDestroy(): void {
  }

  valueDidChange(value: boolean): void {
    this.updateBlock(value);
  }

  protected updateBlock(value: boolean): void {
    const block = {
      id: this.blockId,
      changes: {
        value: value,
      },
    };
    this.checkBoxStore.updateBlock(block);
  }

  protected setupAsyncObs(): void {
    this.block$ = this.checkBoxStore.getBlockById(this.blockId)
      .pipe(tap(block => console.log(JSON.stringify(block))));
  }
}
