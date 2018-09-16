import { InjectionToken } from '@angular/core';
import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromInstanceListEffects from './instance-list-effects.reducer';
import * as fromInstanceList from './instance-list.reducer';

export interface InstanceListState {
  effects: fromInstanceListEffects.State;
  instances: fromInstanceList.State;
}

export interface State extends fromRoot.State {
  instanceList: InstanceListState;
}

// -----------------
// ------------ AOT
export const TOKEN = new InjectionToken<ActionReducerMap<fromInstanceList.State>>('InstanceListReducers');

export function getReducers(): ActionReducerMap<InstanceListState, any> {
  return {
    effects: fromInstanceListEffects.reducer,
    instances: fromInstanceList.reducer,
  };
}

export const reducerProvider = [
  { provide: TOKEN, useFactory: getReducers },
];

// -----------------
// --- feature selector
export const getInstanceListState = createFeatureSelector<InstanceListState>('instanceList');

// -----------------
// ------- instances
export const getInstancesState = createSelector(getInstanceListState, state => state.instances);

export const getFetchedInstances = createSelector(getInstancesState, fromInstanceList.getFetchedInstances);
export const getFetchLoading = createSelector(getInstancesState, fromInstanceList.getFetchLoading);
export const getFetchError = createSelector(getInstancesState, fromInstanceList.getFetchError);
