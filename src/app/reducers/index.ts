import { InjectionToken } from '@angular/core';
import { ActionReducer, ActionReducerMap, combineReducers, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromRouter from '@ngrx/router-store';

import * as fromCore from '../core/reducers';

import { RouterStateUrl } from '../shared/shared.module';

import { environment } from '../../environments/environment';

export interface State {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  core: fromCore.CoreState;
}

// -----------------
// ------------ AOT
export const TOKEN = new InjectionToken<ActionReducerMap<State>>('AppReducers');

export function getReducers(): ActionReducerMap<State, any> {
  return {
    router: fromRouter.routerReducer,
    core: combineReducers(fromCore.reducers),
  };
}

export const reducerProvider = [
  { provide: TOKEN, useFactory: getReducers },
];

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function (state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger, storeFreeze] : [];

export {
  getAllModalAlerts,
  getAllModalConfirmers,
  getModalConfirmerResults,
} from '../core/reducers';
