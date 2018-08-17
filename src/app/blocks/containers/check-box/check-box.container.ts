import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';

import { BlockComponent } from '../../../shared/shared.module';

import { CheckBoxBlock } from '../../models';

import { CheckBoxStoreService } from './check-box-store.service';

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
  @Input() readonly block: CheckBoxBlock;

  block$: Observable<CheckBoxBlock | undefined>;

  constructor(protected checkBoxStore: CheckBoxStoreService) {
  }

  ngOnInit(): void {
    this.checkBoxStore.addBlock(this.block);
    this.setupAsyncObs();
  }

  ngOnDestroy(): void {
    this.checkBoxStore.clearBlock(this.block.id);
  }

  valueDidChange(value: boolean): void {
    this.updateBlock(value);
  }

  protected updateBlock(value: boolean): void {
    const block = {
      id: this.block.id,
      changes: {
        value: value,
      },
    };
    this.checkBoxStore.updateBlock(block);
  }

  protected setupAsyncObs(): void {
    this.block$ = this.checkBoxStore.getCheckBoxById(this.block.id);
  }
}
