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
      (reloadList)="reloadList()"
      (blockDidChange)="blockDidChange($event)">
    </cp-block-list>`,
})
export class BlockListContainerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() instance: string;

  blocks$: Observable<Block[] | undefined>;
  fetchLoading$: Observable<boolean>;
  fetchError$: Observable<string | undefined>;

  protected blocksToSync: Block[];

  protected mAlertFetchErrorId: string;

  protected modalAlertFetchErrorSubscription: Subscription;

  constructor(protected translate: TranslateService,
              protected logger: NGXLogger,
              protected blockListStore: BlockListStoreService) {
    this.mAlertFetchErrorId = '1';
    this.blocksToSync = [];
  }

  ngOnInit(): void {
    this.setupAsyncObs();
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

  blockDidChange(block: Block): void {
    // notification that a particular block has changed
    // 1- group all blocks
    // 2- call sync
    // 3- update the store
    // 4- update ui

    const index = this.blocksToSync.findIndex(b => b.id === block.id);

    if (index < 0) {
      this.blocksToSync.push(block);
    } else {
      this.blocksToSync[index] = block;
    }

    this.blockListStore.syncBlocks(this.instance, this.blocksToSync);
  }

  protected setupAsyncObs(): void {
    this.blocks$ = this.blockListStore.getFetchedBlocks();
    this.fetchLoading$ = this.blockListStore.getFetchLoading();
    this.fetchError$ = this.blockListStore.getFetchError();
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
