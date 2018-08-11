import { InjectionToken } from '@angular/core';
import { createSelector, createFeatureSelector, combineReducers, ActionReducerMap } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromInstanceDetailEffects from './instance-detail-effects.reducer';
import * as fromList from './list/list.reducer';
import * as fromSync from './list/sync.reducer';

export interface InstanceDetailState {
  effects: fromInstanceDetailEffects.State;
  blockList: fromList.State;
  serverSync: fromSync.State;
}

export interface State extends fromRoot.State {
  instanceDetail: InstanceDetailState;
}

// -----------------
// ------------ AOT
export const TOKEN = new InjectionToken<ActionReducerMap<InstanceDetailState>>('InstanceDetailReducers');

export function getReducers(): ActionReducerMap<InstanceDetailState, any> {
  return {
    effects: fromInstanceDetailEffects.reducer,
    blockList: fromList.reducer,
    serverSync: fromSync.reducer,
  };
}

export const reducerProvider = [
  { provide: TOKEN, useFactory: getReducers },
];

// -----------------
// --- feature selector
export const getInstanceDetailState = createFeatureSelector<InstanceDetailState>('instanceDetail');

// -----------------
// ----- block list
export const getBlockListState = createSelector(getInstanceDetailState, state => state.blockList);

export const getFetchedBlocks = createSelector(getBlockListState, fromList.getFetchedBlocks);
export const getFetchLoading = createSelector(getBlockListState, fromList.getFetchLoading);
export const getFetchError = createSelector(getBlockListState, fromList.getFetchError);

export const getInstanceForSyncBlocks = createSelector(getBlockListState, fromList.getInstanceForSyncBlocks);

export const getSyncingBlocks = createSelector(getBlockListState, fromList.getSyncingBlocks);
export const getSyncingLoading = createSelector(getBlockListState, fromList.getSyncingLoading);
export const getSyncError = createSelector(getBlockListState, fromList.getSyncError);

// -----------------
// ----------- sync
export const getServerSyncState = createSelector(getInstanceDetailState, state => state.serverSync);

export const isSynchronizationRequired = createSelector(getServerSyncState, fromSync.isSynchronizationRequired);
export const isSynchronizationRequiredWithTimestamp = createSelector(getServerSyncState, fromSync.isSynchronizationRequiredWithTimestamp);
