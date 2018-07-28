import { Component, ChangeDetectionStrategy, OnInit, OnChanges, OnDestroy, Input, SimpleChanges } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';

import { ModalAlert } from '../../../../../core/core.module';
import { Block, BLOCK_UTILS_TOKEN } from '../../../../../shared/shared.module';

import { InstanceParams } from '../../../../models';

import { BlockUtilsService } from './block-utils.service';
import { ListStoreService } from './list-store.service';

@Component({
  selector: 'ct-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: BLOCK_UTILS_TOKEN, useClass: BlockUtilsService },
    ListStoreService,
  ],
  template: `
    <cp-list
      [blocks]="blocks$ | async"
      [loading]="fetchLoading$ | async"
      [fetchError]="fetchError$ | async"
      (reloadList)="reloadList()">
    </cp-list>`,
})
export class ListContainerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() instanceParams: InstanceParams;

  blocks$: Observable<Block[] | undefined>;
  fetchLoading$: Observable<boolean>;
  fetchError$: Observable<string | undefined>;

  protected mAlertFetchErrorId: string;

  protected modalAlertFetchErrorSubscription: Subscription;

  constructor(protected translate: TranslateService,
              protected logger: NGXLogger,
              protected listStore: ListStoreService) {
    this.blocks$ = this.listStore.getFetchedBlocks();
    this.fetchLoading$ = this.listStore.getFetchLoading();
    this.fetchError$ = this.listStore.getFetchError();

    this.mAlertFetchErrorId = '1';
  }

  ngOnInit(): void {
    this.subscribeToFetchErrors();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.instanceParams.module && this.instanceParams.instance && this.instanceParams.step) {
      this.listStore.dispatchClearBlocks();
      this.reloadList(this.instanceParams.module, this.instanceParams.instance, this.instanceParams.step);
    }
  }

  subscribeToFetchErrors(): void {
    this.modalAlertFetchErrorSubscription = this.fetchError$
      .subscribe((err) => {
        if (err) {
          const modalAlert: ModalAlert = {
            id: this.mAlertFetchErrorId,
            title: this.translate.instant('CONTAINER.LIST.ALERT_TITLE'),
            message: err,
            buttonLabel: this.translate.instant('CONTAINER.LIST.ALERT_BUTTON'),
          };
          this.listStore.dispatchShowModalAlert(modalAlert);
        }
      });
  }

  reloadList(module?: string, instance?: string, step?: string): void {
    const params = this.getInstanceParams(module, instance, step);
    this.listStore.dispatchFetchBlocks(params.module, params.instance, params.step);
  }

  protected getInstanceParams(module?: string, instance?: string, step?: string): InstanceParams {
    const mod = module || this.instanceParams.module;
    const inst = instance || this.instanceParams.instance;
    const st = step || this.instanceParams.step;

    return {
      module: mod,
      instance: inst,
      step: st,
    };
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  protected unsubscribeAll(): void {
    if (this.modalAlertFetchErrorSubscription) {
      this.modalAlertFetchErrorSubscription.unsubscribe();
    }
  }
}
