import { inject, Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs';

import { Block } from '../../shared';

import { actionGroup } from '../store/instance-detail.actions';
import { feature } from '../store/instance-detail.feature';

@Injectable()
export class InstanceDetailStoreService {
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

  isSyncRequired(): Observable<boolean> {
    return this.store$.pipe(select(feature.isSyncRequired));
  }

  isSyncRequiredWithTimestamp(): Observable<{ syncRequired: boolean, timestamp: number | undefined }> {
    return this.store$.pipe(select(feature.isSyncRequiredWithTimestamp));
  }

  syncRequired(): void {
    this.store$.dispatch(actionGroup.syncRequired({ timestamp: Date.now() }));
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

  startEffects(): void {
    this.store$.dispatch(actionGroup.startEffects());
  }

  stopEffects(): void {
    this.store$.dispatch(actionGroup.stopEffects());
  }

  clearBlocks(): void {
    this.store$.dispatch(actionGroup.clearBlocks());
  }
}
