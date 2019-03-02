import { createFeatureSelector, createSelector } from '@ngrx/store';

import { InstanceListState } from '../reducers';

export * from './instance-list.selectors';

// -----------------
// --- feature selector
const getInstanceListState = createFeatureSelector<InstanceListState>('instanceList');
