import { Component, ChangeDetectionStrategy, OnInit, OnChanges, OnDestroy, Input, SimpleChanges } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';

import { ModalAlert } from '../../../core/core.module';
import { Block, BLOCK_UTILS_TOKEN } from '../../../shared/shared.module';

import { BlockUtilsService } from './block-utils.service';
import { BlockListStoreService } from './block-list-store.service';

@Component({
  selector: 'ct-block-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: BLOCK_UTILS_TOKEN, useClass: BlockUtilsService },
    BlockListStoreService,
  ],
  template: `
    <cp-block-list
      [blocks]="blocks$ | async"
      [loading]="fetchLoading$ | async"
      [fetchError]="fetchError$ | async"
      (reloadList)="reloadList()">
    </cp-block-list>`,
})
export class BlockListContainerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() instance: string;

  blocks$: Observable<Block[] | undefined>;
  fetchLoading$: Observable<boolean>;
  fetchError$: Observable<string | undefined>;

  protected mAlertFetchErrorId: string;

  protected modalAlertFetchErrorSubscription: Subscription;

  constructor(protected translate: TranslateService,
              protected logger: NGXLogger,
              protected blockListStore: BlockListStoreService) {
    this.blocks$ = this.blockListStore.getFetchedBlocks();
    this.fetchLoading$ = this.blockListStore.getFetchLoading();
    this.fetchError$ = this.blockListStore.getFetchError();

    this.mAlertFetchErrorId = '1';
  }

  ngOnInit(): void {
    this.subscribeAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.instance) {
      this.blockListStore.clearBlocks();
      this.reloadList(this.instance);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
    this.blockListStore.clearBlocks();
  }

  reloadList(instance?: string): void {
    this.blockListStore.fetchBlocks(this.getInstance(instance));
  }

  protected getInstance(instance?: string): string {
    return instance || this.instance;
  }

  protected subscribeAll(): void {
    this.subscribeToFetchErrors();
  }

  protected subscribeToFetchErrors(): void {
    this.modalAlertFetchErrorSubscription = this.fetchError$
      .subscribe((err) => {
        if (err) {
          const modalAlert: ModalAlert = {
            id: this.mAlertFetchErrorId,
            title: this.translate.instant('CONTAINER.BLOCK_LIST.ALERT_TITLE'),
            message: err,
            buttonLabel: this.translate.instant('CONTAINER.BLOCK_LIST.ALERT_BUTTON'),
          };
          this.blockListStore.showModalAlert(modalAlert);
        }
      });
  }

  protected unsubscribeAll(): void {
    if (this.modalAlertFetchErrorSubscription) {
      this.modalAlertFetchErrorSubscription.unsubscribe();
    }
  }
}
