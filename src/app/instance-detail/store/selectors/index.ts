import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { InstanceDetailState } from '../reducers';

import * as fromBlockList from './block-list.selectors';
import * as fromSync from './sync.selectors';

export * from './block-list.selectors';
export * from './sync.selectors';

// -----------------
// --- feature selector
export const getInstanceDetailState = createFeatureSelector<InstanceDetailState>('instanceDetail');
