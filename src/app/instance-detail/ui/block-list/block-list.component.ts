import { Component, Output, Input, EventEmitter } from '@angular/core';
import { NgFor } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { GenericBlockContainerComponent, Block } from '../../../shared';

import { CheckBoxContainerComponent } from './blocks/check-box/check-box.container';
import { CheckBoxConfirmerContainerComponent } from './blocks/check-box-confirmer/check-box-confirmer.container';
import { DatePickerContainerComponent } from './blocks/date-picker/date-picker.container';
import { DropdownContainerComponent } from './blocks/dropdown/dropdown.container';
import { TextInputContainerComponent } from './blocks/text-input/text-input.container';
import { UnknownComponent } from './blocks/unknown/unknown.component';

@Component({
  selector: 'app-block-list-cp',
  standalone: true,
  imports: [
    NgFor,
    TranslateModule,
    GenericBlockContainerComponent,
    CheckBoxContainerComponent,
    CheckBoxConfirmerContainerComponent,
    DatePickerContainerComponent,
    DropdownContainerComponent,
    TextInputContainerComponent,
    UnknownComponent,
  ],
  template: `
    <div class="container-fluid block-list-component">
      <div class="row block-list-main-content" [hidden]="!showData">
        <div class="col-12" *ngFor="let block of dataSource; trackBy: trackByBlock">
          <div class="generic-block">
            <app-generic-block-ct [block]="block"></app-generic-block-ct>
          </div>
        </div>
        <div class="col-12">
          <div class="full-width-message">{{ "COMPONENT.BLOCK_LIST.LOAD_COMPLETED" | translate }}</div>
        </div>
      </div>
      <div class="full-width-message" [hidden]="!isLoadingData">{{ "COMPONENT.BLOCK_LIST.LOADING" | translate }}</div>
      <div class="full-width-message" [hidden]="!hasNoData">{{ "COMPONENT.BLOCK_LIST.NO_RESULT" | translate }}</div>
      <div class="full-width-message" [hidden]="!shouldRetry"
           (click)="loadList()">{{ "COMPONENT.BLOCK_LIST.RETRY" | translate }}
      </div>
      <div class="go-up" appScrollToTop></div>
    </div>`,
  styles: [`
    .block-list-component {
      .block-list-main-content {

        .generic-block {
          padding-top: 10px;
          padding-bottom: 10px;
        }
      }
    }
  `],
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
    return this.blocks !== undefined && this.blocks.length === 0 && this.isLoadingData === false && this.shouldRetry === false;
  }

  get shouldRetry(): boolean {
    return this.error !== undefined && this.isLoadingData === false;
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
