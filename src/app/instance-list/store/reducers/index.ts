import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

import * as fromRoot from '../../../reducers';
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
