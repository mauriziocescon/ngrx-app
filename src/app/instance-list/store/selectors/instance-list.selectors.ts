import { createFeatureSelector, createSelector } from '@ngrx/store';

import { InstanceListState } from '../reducers';

import * as fromInstanceList from '../reducers/instance-list.reducer';

// -----------------
// --- feature selector
const getInstanceListState = createFeatureSelector<InstanceListState>('instanceList');

// -----------------
// ------- instances
const getInstancesState = createSelector(getInstanceListState, state => state.instances);

export const getInstances = createSelector(getInstancesState, fromInstanceList.getInstances);
export const isLoading = createSelector(getInstancesState, fromInstanceList.isLoading);
export const getError = createSelector(getInstancesState, fromInstanceList.getError);
