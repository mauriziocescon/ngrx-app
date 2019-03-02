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
      [loading]="loading$ | async"
      [error]="error$ | async"
      (reloadList)="reloadList()"
      (blockDidChange)="blockDidChange($event)">
    </cp-block-list>`,
})
export class BlockListContainerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() instanceId: string;

  blocks$: Observable<Block[] | undefined>;
  loading$: Observable<boolean>;
  error$: Observable<string | undefined>;

  protected blocksToSync: Block[];

  protected mAlertErrorId: string;

  protected modalAlertErrorSubscription: Subscription;

  constructor(protected translate: TranslateService,
              protected logger: NGXLogger,
              protected blockListStore: BlockListStoreService) {
    this.mAlertErrorId = '1';
    this.blocksToSync = [];
  }

  ngOnInit(): void {
    this.setupAsyncObs();
    this.subscribeAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.instanceId) {
      this.blockListStore.clearBlocks();
      this.reloadList(this.instanceId);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
    this.blockListStore.clearBlocks();
  }

  reloadList(instance?: string): void {
    this.blockListStore.loadBlocks(this.getInstance(instance));
  }

  blockDidChange(block: Block): void {
    // notification that a particular block has changed
    // 1- group all blocks
    // 2- call sync
    // 3- update the store
    // 4- update ui

    const foundBlock = this.blocksToSync.find(b => b.id === block.id);

    if (!foundBlock) {
      this.blocksToSync = [...this.blocksToSync, block];
    } else {
      this.blocksToSync = this.blocksToSync.reduce((blocks: Block[], b: Block) => {
        const foundBlock = b.id === block.id;
        blocks.push(foundBlock ? block : b);
        return blocks;
      }, []);
    }

    this.blockListStore.syncBlocks(this.instanceId, this.blocksToSync);
  }

  protected setupAsyncObs(): void {
    this.blocks$ = this.blockListStore.getFetchedBlocks();
    this.loading$ = this.blockListStore.getFetchLoading();
    this.error$ = this.blockListStore.getFetchError();
  }

  protected getInstance(instance?: string): string {
    return instance || this.instanceId;
  }

  protected subscribeAll(): void {
    this.subscribeToFetchErrors();
  }

  protected subscribeToFetchErrors(): void {
    this.modalAlertErrorSubscription = this.error$
      .subscribe((err) => {
        if (err) {
          const modalAlert: ModalAlert = {
            id: this.mAlertErrorId,
            title: this.translate.instant('CONTAINER.BLOCK_LIST.ALERT_TITLE'),
            message: err,
            buttonLabel: this.translate.instant('CONTAINER.BLOCK_LIST.ALERT_BUTTON'),
          };
          this.blockListStore.showModalAlert(modalAlert);
        }
      });
  }

  protected unsubscribeAll(): void {
    if (this.modalAlertErrorSubscription) {
      this.modalAlertErrorSubscription.unsubscribe();
    }
  }
}
