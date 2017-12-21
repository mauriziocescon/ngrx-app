import { createSelector, createFeatureSelector } from "@ngrx/store";

import * as fromRoot from "../../reducers";
import * as fromModals from "./modals.reduce";

export interface CoreState {
  modals: fromModals.State;
}

export interface State extends fromRoot.State {
  core: CoreState;
}

export const reducers = {
  modals: fromModals.reducer,
};

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `core` state.
 *
 * Selectors are used with the `select` operator.
 *
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getCoreState = createFeatureSelector<CoreState>("core");

export const getModalsState = createSelector(
  getCoreState,
  state => state.modals,
);
