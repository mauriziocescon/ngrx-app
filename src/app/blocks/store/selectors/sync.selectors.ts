import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BlocksState } from '../reducers';

import * as fromSync from '../reducers/sync.reducer';

// -----------------
// --- feature selector
const getBlocksState = createFeatureSelector<BlocksState>('blocks');

// -----------------
// ----- sync
const getSyncState = createSelector(getBlocksState, state => state.sync);

export const isSyncRequired = createSelector(getSyncState, fromSync.isSyncRequired);
export const isSyncRequiredWithTimestamp = createSelector(getSyncState, fromSync.isSyncRequiredWithTimestamp);
