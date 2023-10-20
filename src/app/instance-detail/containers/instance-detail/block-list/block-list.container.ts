import { Component, ChangeDetectionStrategy, OnInit, OnChanges, OnDestroy, Input, SimpleChanges } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';

import { ModalAlert, ModalStoreService } from '../../../../core';
import { Block, BLOCK_UTILS_TOKEN } from '../../../../shared';

import { BlockListStoreService } from '../block-list-store.service';
import { SyncStoreService } from '../sync-store.service';

import { BlockUtilsService } from './block-utils.service';

@Component({
  selector: 'app-block-list-ct',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: BLOCK_UTILS_TOKEN, useClass: BlockUtilsService },
  ],
  template: `
    <app-block-list-cp
      [blocks]="(blocks$ | async)!"
      [loading]="(loading$ | async)!"
      [error]="(error$ | async)!"
      (reloadList)="reloadList()">
    </app-block-list-cp>`,
})
export class BlockListContainerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() instanceId: string;

  blocks$: Observable<Block[] | undefined>;
  loading$: Observable<boolean>;
  error$: Observable<string | undefined>;
  syncRequiredWithTimestamp$: Observable<{ syncRequired: boolean, timestamp: number | undefined }>;

  protected mAlertErrorId: string;

  protected modalAlertErrorSubscription: Subscription;
  protected syncRequiredSubscription: Subscription;

  constructor(protected translate: TranslateService,
              protected logger: NGXLogger,
              protected blockListStore: BlockListStoreService,
              protected modalStore: ModalStoreService,
              protected syncStore: SyncStoreService) {
    this.mAlertErrorId = '1';
  }

  ngOnInit(): void {
    this.setupAsyncObs();
    this.subscribeAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['instanceId']) {
      this.blockListStore.clearBlocks();
      this.reloadList();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
    this.blockListStore.clearBlocks();
  }

  reloadList(): void {
    this.blockListStore.loadBlocks(this.instanceId);
  }

  protected setupAsyncObs(): void {
    this.blocks$ = this.blockListStore.getEditedBlocks();
    this.loading$ = this.blockListStore.isLoadingBlocks();
    this.error$ = this.blockListStore.getLoadingError();
    this.syncRequiredWithTimestamp$ = this.syncStore.isSyncRequiredWithTimestamp();
  }

  protected subscribeAll(): void {
    this.subscribeBlocksLoadingError();
    this.subscribeSyncRequired();
  }

  protected subscribeBlocksLoadingError(): void {
    this.modalAlertErrorSubscription = this.error$
      .subscribe((err) => {
        if (err) {
          const modalAlert: ModalAlert = {
            id: this.mAlertErrorId,
            title: this.translate.instant('CONTAINER.BLOCK_LIST.ALERT_TITLE'),
            message: err,
            buttonLabel: this.translate.instant('CONTAINER.BLOCK_LIST.ALERT_BUTTON'),
          };
          this.modalStore.showModalAlert(modalAlert);
        }
      });
  }

  protected subscribeSyncRequired(): void {
    this.syncRequiredSubscription = this.syncRequiredWithTimestamp$
      .pipe(
        withLatestFrom(this.blocks$),
      )
      .subscribe(([sync, blocks]) => {
        if (sync.syncRequired === true) {
          this.blockListStore.syncBlocks(this.instanceId, blocks as Block[]);
        }
      });
  }

  protected unsubscribeAll(): void {
    if (this.modalAlertErrorSubscription) {
      this.modalAlertErrorSubscription.unsubscribe();
    }
  }
}
