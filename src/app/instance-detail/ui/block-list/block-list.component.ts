import { Component, Output, Input, EventEmitter } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

import { GenericBlockContainerComponent, ScrollToTopDirective, Block } from '../../../shared';

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
    TranslateModule,
    GenericBlockContainerComponent,
    ScrollToTopDirective,
    CheckBoxContainerComponent,
    CheckBoxConfirmerContainerComponent,
    DatePickerContainerComponent,
    DropdownContainerComponent,
    TextInputContainerComponent,
    UnknownComponent,
  ],
  template: `
    <div [hidden]="!showData">
      @for (block of dataSource; track block.id) {
        <div class="generic-block">
          <app-generic-block-ct [block]="block"></app-generic-block-ct>
        </div>
      }
      <div class="full-width-message">{{ "COMPONENT.BLOCK_LIST.LOAD_COMPLETED" | translate }}</div>
    </div>
    <div class="full-width-message" [hidden]="!isLoadingData">{{ "COMPONENT.BLOCK_LIST.LOADING" | translate }}</div>
    <div class="full-width-message" [hidden]="!hasNoData">{{ "COMPONENT.BLOCK_LIST.NO_RESULT" | translate }}</div>
    <div class="full-width-message" [hidden]="!shouldRetry"
         (click)="loadList()">{{ "COMPONENT.BLOCK_LIST.RETRY" | translate }}
    </div>
    <div class="go-up" appScrollToTop></div>`,
  styles: [`
    .generic-block {
      padding-left: var(--padding-s);
      padding-right: var(--padding-s);
      padding-top: var(--padding-m);
      padding-bottom: var(--padding-m);
    }
  `],
})
export class BlockListComponent {
  @Input() blocks: Block[];
  @Input() loading: boolean;
  @Input() error: string;
  @Output() reloadList: EventEmitter<void>;

  constructor() {
    this.loading = false;
    this.reloadList = new EventEmitter();
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

  loadList(): void {
    this.reloadList.emit();
  }
}
