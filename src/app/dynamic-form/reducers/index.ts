import { createSelector, createFeatureSelector, combineReducers } from "@ngrx/store";

import { CheckBoxBlock, DropdownBlock, TextInputBlock } from "../models";

import * as fromRoot from "../../reducers";
import * as fromEditBlocks from "./blocks";
import * as fromCheckBox from "./blocks/check-box/check-box.reducer";
import * as fromDropdown from "./blocks/dropdown/dropdown.reducer";
import * as fromTextInput from "./blocks/text-input/text-input.reducer";
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

// -----------------
// ------------ list
export const getListState = createSelector(getDynamicFormState, state => state.list);

export const getBlocksListState = createSelector(getListState, state => state.blocks);
export const getLoadingListState = createSelector(getListState, state => state.loading);
export const getErrorListState = createSelector(getListState, state => state.error);

// -----------------
// ----- edit blocks
export const getEditBlocksState = createSelector(getDynamicFormState, state => state.editBlocks);

// -----------------
// ------- check-box
export const getCheckBoxState = createSelector(getEditBlocksState, state => state.checkBox);

export const getCheckBoxIds = createSelector(getCheckBoxState, fromCheckBox.getCheckBoxIds);
export const getCheckBoxEntities = createSelector(getCheckBoxState, fromCheckBox.getCheckBoxEntities);
export const getAllCheckBox = createSelector(getCheckBoxState, fromCheckBox.getAllCheckBox);
export const getTotalCheckBox = createSelector(getCheckBoxState, fromCheckBox.getTotalCheckBox);
export const getCheckBoxBlocksValidityState = createSelector(getCheckBoxState, fromCheckBox.getCheckBoxBlocksValidityState);
export const getCheckBoxBlocksLoadingState = createSelector(getCheckBoxState, fromCheckBox.getCheckBoxBlocksLoadingState);

// -----------------
// -------- dropdown
export const getDropdownState = createSelector(getEditBlocksState, state => state.dropdown);

export const getDropdownIds = createSelector(getDropdownState, fromDropdown.getDropdownIds);
export const getDropdownEntities = createSelector(getDropdownState, fromDropdown.getDropdownEntities);
export const getAllDropdown = createSelector(getDropdownState, fromDropdown.getAllDropdown);
export const getTotalDropdown = createSelector(getDropdownState, fromDropdown.getTotalDropdown);
export const getDropdownBlocksValidityState = createSelector(getDropdownState, fromDropdown.getDropdownBlocksValidityState);
export const getDropdownBlocksLoadingState = createSelector(getDropdownState, fromDropdown.getDropdownBlocksLoadingState);

// -----------------
// ------ text-input
export const getTextInputState = createSelector(getEditBlocksState, state => state.textInput);

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
