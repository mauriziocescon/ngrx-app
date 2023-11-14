import { Component, Output, Input, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../../shared';

import { Instance } from '../models';

import { InstanceContainerComponent } from './instance/instance.container';

@Component({
  selector: 'app-instance-list-cp',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    InstanceContainerComponent,
  ],
  template: `
    <div class="container-fluid instance-list-component">

      <div class="row">
        <div class="col-12">
          <app-text-filter-cp (valueDidChange)="textSearchValueDidChange($event)"></app-text-filter-cp>
        </div>
      </div>

      <div class="row list-main-content" *ngIf="showData">
        <div class="col-12 col-sm-6 instance" *ngFor="let instanceId of dataSource; trackBy: trackByBlock">
          <app-instance-ct [instanceId]="instanceId"></app-instance-ct>
        </div>
        <div class="col-12">
          <div class="full-width-message">{{ "COMPONENT.INSTANCE_LIST.LOAD_COMPLETED" | translate }}</div>
        </div>
      </div>

      <div class="full-width-message" [hidden]="!isLoadingData">
        {{ "COMPONENT.INSTANCE_LIST.LOADING" | translate }}
      </div>
      <div class="full-width-message" [hidden]="!hasNoData">
        {{ "COMPONENT.INSTANCE_LIST.NO_RESULT" | translate }}
      </div>
      <div class="full-width-message" [hidden]="!shouldRetry" (click)="loadList()">
        {{ "COMPONENT.INSTANCE_LIST.RETRY" | translate }}
      </div>
      <div class="go-up" appScrollToTop></div>
    </div>`,
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
  @Output() paramsDidChange = new EventEmitter<{ textSearch: string }>();
  @Output() reloadList = new EventEmitter<{ textSearch: string }>();

  protected textSearch: string;

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
