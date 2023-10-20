import { InjectionToken } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromRouter from '@ngrx/router-store';

import { RouterStateUrl } from './route-util';

import { environment } from '../../environments/environment';

export interface State {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

// -----------------
// ------------ AOT
export const TOKEN = new InjectionToken<ActionReducerMap<State>>('AppReducers');

export function getReducers(): ActionReducerMap<State, any> {
  return {
    router: fromRouter.routerReducer,
  };
}

export const reducerProvider = [
  { provide: TOKEN, useFactory: getReducers },
];

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger, storeFreeze] : [];
