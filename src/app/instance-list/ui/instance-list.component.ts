import { Component, Output, Input, EventEmitter } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

import { TextFilterComponent, ScrollToTopDirective } from '../../shared';

import { Instance } from '../models';

import { InstanceContainerComponent } from './instance/instance.container';

@Component({
  selector: 'app-instance-list-cp',
  standalone: true,
  imports: [
    TranslateModule,
    TextFilterComponent,
    ScrollToTopDirective,
    InstanceContainerComponent,
  ],
  template: `
    <app-text-filter-cp (valueDidChange)="textSearchValueDidChange($event)"></app-text-filter-cp>

    @if (showData) {
      @for (instanceId of dataSource; track instanceId) {
        <div class="instance">
          <app-instance-ct [instanceId]="instanceId"></app-instance-ct>
        </div>
      }
      <div class="full-width-message">{{ "COMPONENT.INSTANCE_LIST.LOAD_COMPLETED" | translate }}</div>
    }

    <div class="full-width-message" [hidden]="!isLoadingData">
      {{ "COMPONENT.INSTANCE_LIST.LOADING" | translate }}
    </div>
    <div class="full-width-message" [hidden]="!hasNoData">
      {{ "COMPONENT.INSTANCE_LIST.NO_RESULT" | translate }}
    </div>
    <div class="full-width-message" [hidden]="!shouldRetry" (click)="loadList()">
      {{ "COMPONENT.INSTANCE_LIST.RETRY" | translate }}
    </div>
    <div class="go-up" appScrollToTop></div>`,
  styles: `
    .instance {
      padding-left: var(--padding-s);
      padding-right: var(--padding-s);
      padding-top: var(--padding-m);
      padding-bottom: var(--padding-m);
    }
  `,
})
export class InstanceListComponent {
  @Input() instances: Instance[];
  @Input() loading: boolean;
  @Input() error: string;
  @Output() paramsDidChange = new EventEmitter<{ textSearch: string }>();
  @Output() reloadList = new EventEmitter<{ textSearch: string }>();

  private textSearch: string;

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
