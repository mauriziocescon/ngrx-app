import { Component, Output, Input, EventEmitter } from '@angular/core';

import { Instance } from '../../models';

@Component({
  selector: 'app-instance-list-cp',
  templateUrl: './instance-list.component.html',
  styles: [`
    .instance-list-component {
      padding-top: 10px;

      .list-main-content {
        padding-top: 10px;
        padding-bottom: 10px;

        .instance {
          padding-top: 10px;
          padding-bottom: 10px;
        }
      }
    }
  `],
})
export class InstanceListComponent {
  @Input() instances: Instance[];
  @Input() loading: boolean;
  @Input() error: string;
  @Output() paramsDidChange: EventEmitter<{ textSearch: string }>;
  @Output() reloadList: EventEmitter<{ textSearch: string }>;

  protected textSearch: string;

  constructor() {
    this.paramsDidChange = new EventEmitter<{ textSearch: string }>();
    this.reloadList = new EventEmitter<{ textSearch: string }>();
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

  get dataSource(): string[] | undefined {
    return this.instances.map(instance => instance.id);
  }

  trackByBlock(index: number, id: string): string {
    return id;
  }

  textSearchValueDidChange(value: string): void {
    this.textSearch = value;

    const params = {
      textSearch: this.textSearch,
    };
    this.paramsDidChange.emit(params);
  }

  loadList(): void {
    const params = {
      textSearch: this.textSearch,
    };
    this.reloadList.emit(params);
  }
}
