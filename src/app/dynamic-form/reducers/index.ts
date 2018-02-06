import { InjectionToken } from "@angular/core";
import { createSelector, createFeatureSelector, combineReducers, ActionReducerMap } from "@ngrx/store";

import { CheckBoxBlock, DropdownBlock, TextInputBlock } from "../models";

import * as fromRoot from "../../reducers";
import * as fromEditBlocks from "./blocks";
import * as fromCheckBox from "./blocks/check-box/check-box.reducer";
import * as fromDropdown from "./blocks/dropdown/dropdown.reducer";
import * as fromTextInput from "./blocks/text-input/text-input.reducer";
import * as fromList from "./list.reducer";

export interface DynamicFormState {
  blocksList: fromList.State;
  editBlocks: fromEditBlocks.State;
}

export interface State extends fromRoot.State {
  dynamicForm: DynamicFormState;
}

// -----------------
// ------------ AOT
export const TOKEN = new InjectionToken<ActionReducerMap<fromEditBlocks.State>>("DynamicFormEditBlocksReducers");

export const getReducers = () => {
  return {
    blocksList: fromList.reducer,
    editBlocks: combineReducers(fromEditBlocks.reducers),
  };
};

export const reducerProvider = [
  {provide: TOKEN, useFactory: getReducers}
];

// -----------------
// --- feature selector
export const getDynamicFormState = createFeatureSelector<DynamicFormState>("dynamicForm");

// -----------------
// ----- blocks list
export const getListState = createSelector(getDynamicFormState, state => state.blocksList);

export const getFetchedBlocksState = createSelector(getListState, state => state.fetchedBlocks);
export const getFetchLoadingState = createSelector(getListState, state => state.fetchLoading);
export const getFetchErrorState = createSelector(getListState, state => state.fetchError);

export const getUpdateBlocksState = createSelector(getListState, state => state.updateBlocks);
export const getUpdateLoadingState = createSelector(getListState, state => state.updateLoading);
export const getUpdateErrorState = createSelector(getListState, state => state.updateError);

// -----------------
// ----- edit blocks
export const getEditBlocksState = createSelector(getDynamicFormState, state => state.editBlocks);

// -----------------
// ------- check-box
export const getCheckBoxState = createSelector(getEditBlocksState, fromEditBlocks.getCheckBoxState);

export const getCheckBoxIds = createSelector(getCheckBoxState, fromCheckBox.getCheckBoxIds);
export const getCheckBoxEntities = createSelector(getCheckBoxState, fromCheckBox.getCheckBoxEntities);
export const getAllCheckBox = createSelector(getCheckBoxState, fromCheckBox.getAllCheckBox);
export const getTotalCheckBox = createSelector(getCheckBoxState, fromCheckBox.getTotalCheckBox);
export const getCheckBoxBlocksValidityState = createSelector(getCheckBoxState, fromCheckBox.getCheckBoxBlocksValidityState);
export const getCheckBoxBlocksLoadingState = createSelector(getCheckBoxState, fromCheckBox.getCheckBoxBlocksLoadingState);

// -----------------
// -------- dropdown
export const getDropdownState = createSelector(getEditBlocksState, fromEditBlocks.getDropdownState);

export const getDropdownIds = createSelector(getDropdownState, fromDropdown.getDropdownIds);
export const getDropdownEntities = createSelector(getDropdownState, fromDropdown.getDropdownEntities);
export const getAllDropdown = createSelector(getDropdownState, fromDropdown.getAllDropdown);
export const getTotalDropdown = createSelector(getDropdownState, fromDropdown.getTotalDropdown);
export const getDropdownBlocksValidityState = createSelector(getDropdownState, fromDropdown.getDropdownBlocksValidityState);
export const getDropdownBlocksLoadingState = createSelector(getDropdownState, fromDropdown.getDropdownBlocksLoadingState);

// -----------------
// ------ text-input
export const getTextInputState = createSelector(getEditBlocksState, fromEditBlocks.getTextInputState);

export const getTextInputIds = createSelector(getTextInputState, fromTextInput.getTextInputIds);
export const getTextInputEntities = createSelector(getTextInputState, fromTextInput.getTextInputEntities);
export const getAllTextInput = createSelector(getTextInputState, fromTextInput.getAllTextInput);
export const getTotalTextInput = createSelector(getTextInputState, fromTextInput.getTotalTextInput);
export const getTextInputBlocksValidityState = createSelector(getTextInputState, fromTextInput.getTextInputBlocksValidityState);
export const getTextInputBlocksLoadingState = createSelector(getTextInputState, fromTextInput.getTextInputBlocksLoadingState);

// -----------------
// --------- generic
export const getAllEditBlocksState = createSelector(
  getAllCheckBox,
  getAllDropdown,
  getAllTextInput,
  (checkBoxBlocks: CheckBoxBlock[], dropdownBlocks: DropdownBlock[], textInputBlocks: TextInputBlock[]) => {
    return [
      ...checkBoxBlocks,
      ...dropdownBlocks,
      ...textInputBlocks,
    ];
  },
);

export const getAllEditBlocksValidityState = createSelector(
  getCheckBoxBlocksValidityState,
  getDropdownBlocksValidityState,
  getTextInputBlocksValidityState,
  (checkBoxValidity: boolean, dropdownValidity: boolean, textInputValidity: boolean) => {
    return checkBoxValidity && dropdownValidity && textInputValidity;
  }
);
