import { Component, Output, Input, EventEmitter } from "@angular/core";

import { Block } from "../../../models";

@Component({
  selector: "cp-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent {
  @Input() blocks: Block[];
  @Input() loading: boolean;
  @Input() fetchError: string;
  @Output() reloadList: EventEmitter<void>;

  @Input() formValidity: boolean;
  @Input() syncing: boolean;
  @Input() syncError: string;
  @Output() nextStep: EventEmitter<void>;
  @Output() reset: EventEmitter<void>;

  constructor() {
    this.loading = false;
    this.reloadList = new EventEmitter();
    this.nextStep = new EventEmitter();
    this.reset = new EventEmitter();
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
    return block.id;
  }

  loadList(): void {
    this.reloadList.emit();
  }

  moveToNextStep(): void {
    this.nextStep.emit();
  }

  resetForm(): void {
    this.reset.emit();
  }
}
