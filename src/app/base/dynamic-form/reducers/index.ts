import { createSelector, createFeatureSelector, combineReducers } from "@ngrx/store";

import * as fromRoot from "../../../reducers";
import * as fromEditBlocks from "./blocks";
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
  editBlocks: combineReducers(fromEditBlocks.reducers),
};

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


export {
  getCheckBoxIds,
  getCheckBoxEntities,
  getAllCheckBox,
  getTotalCheckBox,
  getCheckBoxBlocksValidityState,
  getCheckBoxBlocksLoadingState,

  getDropdownState,
  getDropdownIds,
  getDropdownEntities,
  getAllDropdown,
  getTotalDropdown,
  getDropdownBlocksValidityState,
  getDropdownBlocksLoadingState,

  getTextInputState,
  getTextInputIds,
  getTextInputEntities,
  getAllTextInput,
  getTotalTextInput,
  getTextInputBlocksValidityState,
  getTextInputBlocksLoadingState,

  getAllEditBlocksState,
  getAllEditBlocksValidityState,
} from "./blocks";
