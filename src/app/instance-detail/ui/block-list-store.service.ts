import { inject, Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs';

import { Block } from '../../shared';

import { actionGroup } from '../store/instance-detail.actions';
import { feature } from '../store/instance-detail.feature';

@Injectable()
export class BlockListStoreService {
  protected store$ = inject(Store);

  getBlockById(id: string): Observable<Block | undefined> {
    return this.store$.pipe(select(feature.getBlockById(id)));
  }

  isLoadingBlocks(): Observable<boolean> {
    return this.store$.pipe(select(feature.isLoadingBlocks));
  }

  getLoadingError(): Observable<string | undefined> {
    return this.store$.pipe(select(feature.getLoadingError));
  }

  getEditedBlocks(): Observable<Block[] | undefined> {
    return this.store$.pipe(select(feature.getEditedBlocks));
  }

  isSyncingBlocks(): Observable<boolean> {
    return this.store$.pipe(select(feature.isSyncOngoing));
  }

  getSyncError(): Observable<string | undefined> {
    return this.store$.pipe(select(feature.getSyncError));
  }

  isNextStepEnable(): Observable<boolean> {
    return this.store$.pipe(select(feature.isNextStepEnable));
  }

  loadBlocks(instanceId: string): void {
    this.store$.dispatch(actionGroup.loadBlocks({ instanceId }));
  }

  syncBlocks(instanceId: string, blocks: Block[]): void {
    this.store$.dispatch(actionGroup.syncBlocks({ instanceId, blocks }));
  }

  updateBlock(block: Update<Block>): void {
    this.store$.dispatch(actionGroup.updateBlock({ block }));
  }

  clearBlocks(): void {
    this.store$.dispatch(actionGroup.clearBlocks());
  }
}
