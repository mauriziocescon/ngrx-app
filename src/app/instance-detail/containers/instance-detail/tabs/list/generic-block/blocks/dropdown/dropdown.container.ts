import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BlockComponent, BlockType, DropdownBlock } from '../../../../../../../models';

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
      [loading]="loading$ | async"
      (valueDidChange)="valueDidChange($event)">
    </cp-dropdown>`,
})
export class DropdownContainerComponent implements BlockComponent {
  @Input() readonly blockId: string;

  block$: Observable<DropdownBlock | undefined>;
  dropdownBlock: DropdownBlock | undefined;

  loading$: Observable<boolean>;

  constructor(protected dropdownStore: DropdownStoreService) {
    this.block$ = this.dropdownStore.getDropdownEntities()
      .map((entities: { [id: string]: DropdownBlock }) => {
        return this.dropdownBlock = entities[this.blockId];
      });

    this.loading$ = this.dropdownStore.getDropdownBlocksLoading()
      .map((blocksLoading: { [id: string]: boolean }) => {
        return blocksLoading[this.blockId];
      });
  }

  valueDidChange(value: string): void {
    this.dispatchValueDidChangeAction(value);
  }

  protected dispatchValueDidChangeAction(value: string): void {
    if (this.dropdownBlock) {
      const block = {
        block: {
          id: this.blockId,
          changes: {
            id: this.blockId,
            type: BlockType.Dropdown,
            order: this.dropdownBlock.order,
            label: this.dropdownBlock.label,
            value: value,
            choices: [...this.dropdownBlock.choices],
            required: this.dropdownBlock.required,
            disabled: this.dropdownBlock.disabled,
            hooks: {
              ...this.dropdownBlock.hooks,
            },
          },
        },
        triggerHooks: true,
      };
      this.dropdownStore.dispatchUpdateBlock(block);
    }
  }
}
