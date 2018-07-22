import { InjectionToken } from '@angular/core';
import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import { CheckBoxBlock, DropdownBlock, TextInputBlock } from '../models';

import * as fromRoot from '../../reducers';
import * as fromCheckBox from './check-box.reducer';
import * as fromDropdown from './dropdown.reducer';
import * as fromTextInput from './text-input.reducer';

export interface BlocksState {
  checkBox: fromCheckBox.State;
  dropdown: fromDropdown.State;
  textInput: fromTextInput.State;
}

export interface State extends fromRoot.State {
  blocks: BlocksState;
}

// -----------------
// ------------ AOT
export const TOKEN = new InjectionToken<ActionReducerMap<BlocksState>>('BlocksReducers');

export function getReducers(): ActionReducerMap<BlocksState, any> {
  return {
    checkBox: fromCheckBox.reducer,
    dropdown: fromDropdown.reducer,
    textInput: fromTextInput.reducer,
  };
}

export const reducerProvider = [
  { provide: TOKEN, useFactory: getReducers },
];

// -----------------
// --- feature selector
export const getBlocksState = createFeatureSelector<BlocksState>('blocks');

// ------- check-box
export const getCheckBoxState = createSelector(getBlocksState, state => state.checkBox);

export const getCheckBoxIds = createSelector(getCheckBoxState, fromCheckBox.getCheckBoxIds);
export const getCheckBoxEntities = createSelector(getCheckBoxState, fromCheckBox.getCheckBoxEntities);
export const getAllCheckBox = createSelector(getCheckBoxState, fromCheckBox.getAllCheckBox);
export const getTotalCheckBox = createSelector(getCheckBoxState, fromCheckBox.getTotalCheckBox);
export const getCheckBoxBlocksValidityState = createSelector(getCheckBoxState, fromCheckBox.getCheckBoxBlocksValidityState);
export const getCheckBoxBlocksLoadingState = createSelector(getCheckBoxState, fromCheckBox.getCheckBoxBlocksLoadingState);

// -------- dropdown
export const getDropdownState = createSelector(getBlocksState, state => state.dropdown);

export const getDropdownIds = createSelector(getDropdownState, fromDropdown.getDropdownIds);
export const getDropdownEntities = createSelector(getDropdownState, fromDropdown.getDropdownEntities);
export const getAllDropdown = createSelector(getDropdownState, fromDropdown.getAllDropdown);
export const getTotalDropdown = createSelector(getDropdownState, fromDropdown.getTotalDropdown);
export const getDropdownBlocksValidityState = createSelector(getDropdownState, fromDropdown.getDropdownBlocksValidityState);
export const getDropdownBlocksLoadingState = createSelector(getDropdownState, fromDropdown.getDropdownBlocksLoadingState);

// ------ text-input
export const getTextInputState = createSelector(getBlocksState, state => state.textInput);

export const getTextInputIds = createSelector(getTextInputState, fromTextInput.getTextInputIds);
export const getTextInputEntities = createSelector(getTextInputState, fromTextInput.getTextInputEntities);
export const getAllTextInput = createSelector(getTextInputState, fromTextInput.getAllTextInput);
export const getTotalTextInput = createSelector(getTextInputState, fromTextInput.getTotalTextInput);
export const getTextInputBlocksValidityState = createSelector(getTextInputState, fromTextInput.getTextInputBlocksValidityState);
export const getTextInputBlocksLoadingState = createSelector(getTextInputState, fromTextInput.getTextInputBlocksLoadingState);
