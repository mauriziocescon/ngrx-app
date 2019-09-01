import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs';

import { Block } from '../../../shared/shared.module';

import * as blockList from '../../store/actions/block-list.actions';

import * as fromInstanceDetailReducers from '../../store/reducers';

import * as fromInstanceDetailSelectors from '../../store/selectors';

@Injectable()
export class BlockListStoreService {

  constructor(protected store$: Store<fromInstanceDetailReducers.State>) {
  }

  getBlockById(id: string): Observable<Block> {
    return this.store$.pipe(select(fromInstanceDetailSelectors.getBlockById(), { id: id }));
  }

  isLoadingBlocks(): Observable<boolean> {
    return this.store$.pipe(select(fromInstanceDetailSelectors.isLoadingBlocks));
  }

  getLoadingError(): Observable<string | undefined> {
    return this.store$.pipe(select(fromInstanceDetailSelectors.getLoadingError));
  }

  getEditedBlocks(): Observable<Block[] | undefined> {
    return this.store$.pipe(select(fromInstanceDetailSelectors.getEditedBlocks));
  }

  isSyncingBlocks(): Observable<boolean> {
    return this.store$.pipe(select(fromInstanceDetailSelectors.isSyncOngoing));
  }

  getSyncError(): Observable<string | undefined> {
    return this.store$.pipe(select(fromInstanceDetailSelectors.getSyncError));
  }

  isNextStepEnable(): Observable<boolean> {
    return this.store$.pipe(select(fromInstanceDetailSelectors.isNextStepEnable));
  }

  loadBlocks(instanceId: string): void {
    this.store$.dispatch(new blockList.LoadBlocks({ instanceId }));
  }

  syncBlocks(instanceId: string, blocks: Block[]): void {
    this.store$.dispatch(new blockList.SyncBlocks({ instanceId, blocks }));
  }

  updateBlock(block: Update<Block>): void {
    const payload = { block };
    this.store$.dispatch(new blockList.UpdateBlock(payload));
  }

  clearBlocks(): void {
    this.store$.dispatch(new blockList.ClearBlocks());
  }
}
