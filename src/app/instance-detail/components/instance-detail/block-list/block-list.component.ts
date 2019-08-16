import { Component, Output, Input, EventEmitter } from '@angular/core';

import { Block } from '../../../../shared/shared.module';

@Component({
  selector: 'cp-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.scss'],
})
export class BlockListComponent {
  @Input() blocks: Block[];
  @Input() loading: boolean;
  @Input() error: string;
  @Output() reloadList: EventEmitter<void>;
  @Output() blockDidChange: EventEmitter<Block>;

  constructor() {
    this.loading = false;
    this.reloadList = new EventEmitter();
    this.blockDidChange = new EventEmitter();
  }

  get isLoadingData(): boolean {
    return this.loading === true;
  }

  get hasNoData(): boolean {
    return this.blocks !== undefined && this.blocks.length === 0 && this.isLoadingData === false;
  }

  get shouldRetry(): boolean {
    return this.blocks === undefined && this.isLoadingData === false;
  }

  get showData(): boolean {
    return this.isLoadingData === false && this.hasNoData === false && this.shouldRetry === false;
  }

  get dataSource(): Block[] | undefined {
    return this.blocks;
  }

  trackByBlock(index: number, block: Block): number {
    return parseInt(block.id, 10);
  }

  loadList(): void {
    this.reloadList.emit();
  }

  triggerChange(block: Block): void {
    this.blockDidChange.emit(block);
  }
}
