import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

import * as fromRoot from '../../../reducers';
import * as fromBlockList from './block-list.reducer';
import * as fromInstanceDetailEffects from './instance-detail-effects.reducer';
import * as fromSync from './sync.reducer';

export interface InstanceDetailState {
  blockList: fromBlockList.State;
  effects: fromInstanceDetailEffects.State;
  sync: fromSync.State;
}

export interface State extends fromRoot.State {
  instanceDetail: InstanceDetailState;
}

// -----------------
// ------------ AOT
export const TOKEN = new InjectionToken<ActionReducerMap<InstanceDetailState>>('InstanceDetailReducers');

export function getReducers(): ActionReducerMap<InstanceDetailState, any> {
  return {
    blockList: fromBlockList.reducer,
    effects: fromInstanceDetailEffects.reducer,
    sync: fromSync.reducer,
  };
}

export const reducerProvider = [
  { provide: TOKEN, useFactory: getReducers },
];
