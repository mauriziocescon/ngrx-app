import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';

import { BlockComponent } from '../../../../../../shared/shared.module';

import { DropdownBlock } from '../../../../../models';

import { DropdownStoreService } from './dropdown-store.service';

@Component({
  selector: 'ct-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DropdownStoreService,
  ],
  template: `
    <cp-dropdown
      [block]="block$ | async">
    </cp-dropdown>`,
})
export class DropdownContainerComponent implements BlockComponent, OnInit, OnDestroy {
  @Input() blockId: string;

  block$: Observable<DropdownBlock | undefined>;

  constructor(protected dropdownStore: DropdownStoreService) {
  }

  ngOnInit(): void {
    this.setupAsyncObs();
  }

  ngOnDestroy(): void {
  }

  valueDidChange(value: string): void {
    this.updateBlock(value);
  }

  protected updateBlock(value: string): void {
    const block = {
      id: this.blockId,
      changes: {
        value: value,
      },
    };
    this.dropdownStore.updateBlock(block);
  }

  protected setupAsyncObs(): void {
    this.block$ = this.dropdownStore.getBlockById(this.blockId);
  }
}
