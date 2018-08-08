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
export const getListState = createSelector(getInstanceDetailState, state => state.blockList);

export const getFetchedBlocksState = createSelector(getListState, fromList.getFetchedBlocksState);
export const getFetchLoadingState = createSelector(getListState, fromList.getFetchLoadingState);
export const getFetchErrorState = createSelector(getListState, fromList.getFetchErrorState);

export const getModuleForSyncBlocksState = createSelector(getListState, fromList.getModuleForSyncBlocksState);
export const getInstanceForSyncBlocksState = createSelector(getListState, fromList.getInstanceForSyncBlocksState);
export const getStepForSyncBlocksState = createSelector(getListState, fromList.getStepForSyncBlocksState);

export const getSyncingBlocksState = createSelector(getListState, fromList.getSyncingBlocksState);
export const getSyncingLoadingState = createSelector(getListState, fromList.getSyncingLoadingState);
export const getSyncErrorState = createSelector(getListState, fromList.getSyncErrorState);

// -----------------
// ----------- sync
export const getServerSyncState = createSelector(getInstanceDetailState, state => state.serverSync);

export const isSynchronizationRequiredState = createSelector(getServerSyncState, fromSync.isSynchronizationRequiredState);
export const isSynchronizationRequiredWithTimestampState = createSelector(getServerSyncState, fromSync.isSynchronizationRequiredWithTimestampState);
