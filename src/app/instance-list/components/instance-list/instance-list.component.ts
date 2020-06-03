import { Component, Output, Input, EventEmitter } from '@angular/core';

import { Instance } from '../../models';

@Component({
  selector: 'app-instance-list-cp',
  templateUrl: './instance-list.component.html',
  styleUrls: ['./instance-list.component.scss'],
})
export class InstanceListComponent {
  @Input() instances: Instance[];
  @Input() loading: boolean;
  @Input() error: string;
  @Output() paramsDidChange: EventEmitter<{ textSearch: string }>;
  @Output() reloadList: EventEmitter<{ textSearch: string }>;
  @Output() goTo: EventEmitter<Instance>;

  protected textSearch: string;

  constructor() {
    this.paramsDidChange = new EventEmitter<{ textSearch: string }>();
    this.reloadList = new EventEmitter<{ textSearch: string }>();
    this.goTo = new EventEmitter<Instance>();
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
    return parseInt(instance.id, 10);
  }

  textSearchValueDidChange(value: string): void {
    this.textSearch = value;

    const params = {
      textSearch: this.textSearch,
    };
    this.paramsDidChange.emit(params);
  }

  selectInstance(instance: Instance): void {
    this.goTo.emit(instance);
  }

  loadList(): void {
    const params = {
      textSearch: this.textSearch,
    };
    this.reloadList.emit(params);
  }
}
