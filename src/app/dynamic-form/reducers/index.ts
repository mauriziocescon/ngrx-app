import { createSelector, createFeatureSelector } from "@ngrx/store";

import * as fromRoot from "../../reducers";
import * as fromList from "./list.reducer";

export interface DynamicFormState {
  list: fromList.State;
}

export interface State extends fromRoot.State {
  dynamicForm: DynamicFormState;
}

export const reducers = {
  list: fromList.reducer,
};


/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `dynamicForm` state.
 *
 * Selectors are used with the `select` operator.
 *
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getDynamicFormState = createFeatureSelector<DynamicFormState>("dynamicForm");

export const getListsState = createSelector(
  getDynamicFormState,
  state => state.list
);

export const getBlocksState = createSelector(
  getListsState,
  state => state.blocks
);

export const getLoadingState = createSelector(
  getListsState,
  state => state.loading
);

export const getErrorState = createSelector(
  getListsState,
  state => state.error
);
