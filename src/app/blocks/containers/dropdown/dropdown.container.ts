import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BlockComponent } from '../../../shared/shared.module';

import { DropdownBlock } from '../../models';

import { DropdownStoreService } from './dropdown-store.service';

@Component({
  selector: 'ct-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DropdownStoreService,
  ],
  template: `
    <cp-dropdown
      [block]="block$ | async"
      (valueDidChange)="valueDidChange($event)">
    </cp-dropdown>`,
})
export class DropdownContainerComponent implements BlockComponent, OnInit, OnDestroy {
  @Input() readonly block: DropdownBlock;

  block$: Observable<DropdownBlock | undefined>;

  constructor(protected dropdownStore: DropdownStoreService) {
  }

  ngOnInit(): void {
    this.dropdownStore.addBlock(this.block);
    this.setupAsyncObs();
  }

  ngOnDestroy(): void {
    this.dropdownStore.clearBlock(this.block.id);
  }

  valueDidChange(value: string): void {
    this.updateBlock(value);
  }

  protected updateBlock(value: string): void {
    const block = {
      id: this.block.id,
      changes: {
        value: value,
      },
    };
    this.dropdownStore.updateBlock(block);
  }

  protected setupAsyncObs(): void {
    this.block$ = this.dropdownStore.getDropdownEntities()
      .pipe(
        map((entities: { [id: string]: DropdownBlock }) => {
          return entities[this.block.id];
        }),
      );
  }
}
