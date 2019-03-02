import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';

import { InstanceDetailState } from '../reducers';

// -----------------
// --- feature selector
export const getInstanceDetailState = createFeatureSelector<InstanceDetailState>('instanceDetail');
