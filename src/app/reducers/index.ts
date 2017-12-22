import { ActionReducer, ActionReducerMap, combineReducers, MetaReducer } from "@ngrx/store";
import { storeFreeze } from "ngrx-store-freeze";
import * as fromRouter from "@ngrx/router-store";

import * as fromCore from "../core/reducers";

import { RouterStateUrl } from "../shared/utilities/route-util";

import { environment } from "../../environments/environment";

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
  core: fromCore.CoreState;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer,
  core: combineReducers(fromCore.reducers),
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function (state: State, action: any): State {
    console.log("state", state);
    console.log("action", action);

    return reducer(state, action);
  };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger, storeFreeze] : [];

export {
  getAllModalAlerts,
  getAllModalConfirmers,
  getModalConfirmerResults,
} from "../core/reducers";
