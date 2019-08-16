import { createFeatureSelector, createSelector } from '@ngrx/store';

import { InstanceDetailState } from '../reducers';

import * as fromSync from '../reducers/sync.reducer';

// -----------------
// --- feature selector
const getInstanceDetailState = createFeatureSelector<InstanceDetailState>('instanceDetail');

// -----------------
// ----- sync
const getSyncState = createSelector(getInstanceDetailState, state => state.sync);

export const isSyncRequired = createSelector(getSyncState, fromSync.isSyncRequired);
export const isSyncRequiredWithTimestamp = createSelector(getSyncState, fromSync.isSyncRequiredWithTimestamp);
