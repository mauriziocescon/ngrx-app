import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnChanges,
  OnDestroy,
  Input,
  SimpleChanges,
  inject,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { Observable, Subscription } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { ModalAlert, UIUtilitiesService } from '../../../core';
import { Block, BLOCK_UTILS_TOKEN } from '../../../shared';

import { InstanceDetailStoreService } from '../instance-detail-store.service';

import { BlockListComponent } from './block-list.component';
import { BlockUtilsService } from './block-utils.service';

@Component({
  selector: 'app-block-list-ct',
  standalone: true,
  imports: [
    AsyncPipe,
    BlockListComponent,
  ],
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

  private mAlertErrorId: string;

  private modalAlertErrorSubscription: Subscription;
  private syncRequiredSubscription: Subscription;

  private translate = inject(TranslateService);
  private instanceDetailStore = inject(InstanceDetailStoreService);
  private uiUtilities = inject(UIUtilitiesService);

  constructor() {
    this.mAlertErrorId = '1';
  }

  ngOnInit(): void {
    this.setupAsyncObs();
    this.subscribeAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['instanceId']) {
      this.instanceDetailStore.clearBlocks();
      this.reloadList();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
    this.instanceDetailStore.clearBlocks();
  }

  reloadList(): void {
    this.instanceDetailStore.loadBlocks(this.instanceId);
  }

  private setupAsyncObs(): void {
    this.blocks$ = this.instanceDetailStore.getEditedBlocks();
    this.loading$ = this.instanceDetailStore.isLoadingBlocks();
    this.error$ = this.instanceDetailStore.getLoadingError();
    this.syncRequiredWithTimestamp$ = this.instanceDetailStore.isSyncRequiredWithTimestamp();
  }

  private subscribeAll(): void {
    this.subscribeBlocksLoadingError();
    this.subscribeSyncRequired();
  }

  private subscribeBlocksLoadingError(): void {
    this.modalAlertErrorSubscription = this.error$
      .subscribe((err) => {
        if (err) {
          const modalAlert: ModalAlert = {
            id: this.mAlertErrorId,
            title: this.translate.instant('CONTAINER.BLOCK_LIST.ALERT_TITLE'),
            message: err,
            buttonLabel: this.translate.instant('CONTAINER.BLOCK_LIST.ALERT_BUTTON'),
          };
          this.uiUtilities.modalAlert(modalAlert);
        }
      });
  }

  private subscribeSyncRequired(): void {
    this.syncRequiredSubscription = this.syncRequiredWithTimestamp$
      .pipe(withLatestFrom(this.blocks$))
      .subscribe(([sync, blocks]) => {
        if (sync.syncRequired === true) {
          this.instanceDetailStore.syncBlocks(this.instanceId, blocks as Block[]);
        }
      });
  }

  private unsubscribeAll(): void {
    this.modalAlertErrorSubscription?.unsubscribe();
  }
}
