import { Component, Output, Input, EventEmitter } from "@angular/core";
import { Block } from "../../models/block.model";

@Component({
  selector: "cp-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent {
  @Input()
  blocks: Block[];

  @Input()
  loading: boolean;

  @Input()
  error: string;

  @Output()
  reloadList: EventEmitter<void>;

  constructor() {
    this.loading = false;
    this.reloadList = new EventEmitter();
  }

  public get isLoadingData(): boolean {
    return this.loading === true;
  }

  public get hasNoData(): boolean {
    return this.blocks !== undefined && this.blocks.length === 0 && this.isLoadingData === false;
  }

  public get shouldRetry(): boolean {
    return this.blocks === undefined && this.isLoadingData === false;
  }

  public get showData(): boolean {
    return this.isLoadingData === false && this.hasNoData === false && this.shouldRetry === false;
  }

  public get dataSource(): Block[] | undefined {
    return this.blocks;
  }

  public trackByBlock(index: number, block: Block): number {
    return block.id;
  }

  public loadList(): void {
    this.reloadList.emit();
  }
}
