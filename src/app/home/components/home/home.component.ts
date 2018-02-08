import { Component, Output, Input, EventEmitter } from "@angular/core";

import { Instance } from "../../models";

@Component({
  selector: "cp-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  @Input() instances: Instance[];
  @Input() loading: boolean;
  @Input() error: string;
  @Output() reloadList: EventEmitter<void>;

  constructor() {
  }

  get isLoadingData(): boolean {
    return this.loading === true;
  }

  get hasNoData(): boolean {
    return this.instances !== undefined && this.instances.length === 0 && this.isLoadingData === false;
  }

  get shouldRetry(): boolean {
    return this.instances === undefined && this.isLoadingData === false;
  }

  get showData(): boolean {
    return this.isLoadingData === false && this.hasNoData === false && this.shouldRetry === false;
  }

  get dataSource(): Instance[] | undefined {
    return this.instances;
  }

  trackByBlock(index: number, instance: Instance): number {
    return instance.id;
  }

  goTo(instance: Instance): void {

  }

  loadList(): void {
    this.reloadList.emit();
  }
}
