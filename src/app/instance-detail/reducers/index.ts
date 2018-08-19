import { InjectionToken } from '@angular/core';
import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromInstanceDetailEffects from './instance-detail-effects.reducer';

export interface InstanceDetailState {
  effects: fromInstanceDetailEffects.State;
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
  };
}

export const reducerProvider = [
  { provide: TOKEN, useFactory: getReducers },
];

// -----------------
// --- feature selector
export const getInstanceDetailState = createFeatureSelector<InstanceDetailState>('instanceDetail');
