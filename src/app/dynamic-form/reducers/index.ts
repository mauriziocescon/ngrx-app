import { createSelector, createFeatureSelector } from "@ngrx/store";

import * as fromRoot from "../../reducers";
import * as fromEditBlocks from "./edit-blocks.reducer";
import * as fromList from "./list.reducer";

export interface DynamicFormState {
  list: fromList.State;
  editBlocks: fromEditBlocks.State;
}

export interface State extends fromRoot.State {
  dynamicForm: DynamicFormState;
}

export const reducers = {
  list: fromList.reducer,
  editBlocks: fromEditBlocks.reducer,
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

export const getListState = createSelector(
  getDynamicFormState,
  state => state.list,
);

export const getBlocksListState = createSelector(
  getListState,
  state => state.blocks,
);

export const getLoadingListState = createSelector(
  getListState,
  state => state.loading,
);

export const getErrorListState = createSelector(
  getListState,
  state => state.error,
);

export const getEditBlocksState = createSelector(
  getDynamicFormState,
  state => state.editBlocks,
);
