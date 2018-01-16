import { createSelector, createFeatureSelector } from "@ngrx/store";

import * as fromCheckBox from "./check-box/check-box.reducer";
import * as fromDropdown from "./dropdown/dropdown.reducer";
import * as fromTextInput from "./text-input/text-input.reducer";

import { CheckBoxBlock, DropdownBlock, TextInputBlock } from "../../models";

export interface State {
  checkBox: fromCheckBox.State;
  dropdown: fromDropdown.State;
  textInput: fromTextInput.State;
}

export const reducers = {
  checkBox: fromCheckBox.reducer,
  dropdown: fromDropdown.reducer,
  textInput: fromTextInput.reducer,
};

export const getDynamicFormState = createFeatureSelector<any>("dynamicForm");

export const getEditBlocksState = createSelector(
  getDynamicFormState,
  state => state.editBlocks,
);

// -----------------
// ------- check-box
export const getCheckBoxState = createSelector(
  getEditBlocksState,
  state => state.checkBox,
);

export const {
  selectIds: getCheckBoxIds,
  selectEntities: getCheckBoxEntities,
  selectAll: getAllCheckBox,
  selectTotal: getTotalCheckBox,
} = fromCheckBox.adapter.getSelectors(getCheckBoxState);

export const getCheckBoxBlocksValidityState = createSelector(
  getCheckBoxIds,
  getCheckBoxEntities,
  (ids: number[], blocksEntities: { [id: string]: any }) => {
    return ids.findIndex((id: number) => {
      return blocksEntities[id].valid === false;
    }) === -1;
  }
);

export const getCheckBoxBlocksLoadingState = createSelector(
  getCheckBoxState,
  state => state.checkBoxBlocksLoading,
);

// -----------------
// -------- dropdown
export const getDropdownState = createSelector(
  getEditBlocksState,
  state => state.dropdown,
);

export const {
  selectIds: getDropdownIds,
  selectEntities: getDropdownEntities,
  selectAll: getAllDropdown,
  selectTotal: getTotalDropdown,
} = fromDropdown.adapter.getSelectors(getDropdownState);

export const getDropdownBlocksValidityState = createSelector(
  getDropdownIds,
  getDropdownEntities,
  (ids: number[], blocksEntities: { [id: string]: any }) => {
    return ids.findIndex((id: number) => {
      return blocksEntities[id].valid === false;
    }) === -1;
  }
);

export const getDropdownBlocksLoadingState = createSelector(
  getDropdownState,
  state => state.dropdownBlocksLoading,
);

// -----------------
// ------ text-input
export const getTextInputState = createSelector(
  getEditBlocksState,
  state => state.textInput,
);

export const {
  selectIds: getTextInputIds,
  selectEntities: getTextInputEntities,
  selectAll: getAllTextInput,
  selectTotal: getTotalTextInput,
} = fromTextInput.adapter.getSelectors(getTextInputState);


export const getTextInputBlocksValidityState = createSelector(
  getTextInputIds,
  getTextInputEntities,
  (ids: number[], blocksEntities: { [id: string]: any }) => {
    return ids.findIndex((id: number) => {
      return blocksEntities[id].valid === false;
    }) === -1;
  }
);

export const getTextInputBlocksLoadingState = createSelector(
  getTextInputState,
  state => state.textInputConfirmerBlocksLoading,
);

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
