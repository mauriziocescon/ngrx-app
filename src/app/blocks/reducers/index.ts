import { InjectionToken } from '@angular/core';
import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromCheckBox from './check-box.reducer';
import * as fromCheckBoxConfirmer from './check-box-confirmer.reducer';
import * as fromDatePicker from './date-picker.reducer';
import * as fromDropdown from './dropdown.reducer';
import * as fromTextInput from './text-input.reducer';

export interface BlocksState {
  checkBox: fromCheckBox.State;
  checkBoxConfirmer: fromCheckBoxConfirmer.State;
  datePicker: fromDatePicker.State;
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
    checkBoxConfirmer: fromCheckBoxConfirmer.reducer,
    datePicker: fromDatePicker.reducer,
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
export const getCheckBoxBlocksValidity = createSelector(getCheckBoxState, fromCheckBox.getCheckBoxBlocksValidity);
export const getCheckBoxBlocksLoading = createSelector(getCheckBoxState, fromCheckBox.getCheckBoxBlocksLoading);

// -----------------
// ------ check-box-confirmer
export const getCheckBoxConfirmerState = createSelector(getBlocksState, state => state.checkBoxConfirmer);

export const getCheckBoxConfirmerIds = createSelector(getCheckBoxConfirmerState, fromCheckBoxConfirmer.getCheckBoxConfirmerIds);
export const getCheckBoxConfirmerEntities = createSelector(getCheckBoxConfirmerState, fromCheckBoxConfirmer.getCheckBoxConfirmerEntities);
export const getAllCheckBoxConfirmer = createSelector(getCheckBoxConfirmerState, fromCheckBoxConfirmer.getAllCheckBoxConfirmer);
export const getTotalCheckBoxConfirmer = createSelector(getCheckBoxConfirmerState, fromCheckBoxConfirmer.getTotalCheckBoxConfirmer);
export const getCheckBoxConfirmerBlocksValidity = createSelector(getCheckBoxConfirmerState, fromCheckBoxConfirmer.getCheckBoxConfirmerBlocksValidity);
export const getCheckBoxConfirmerBlocksLoading = createSelector(getCheckBoxConfirmerState, fromCheckBoxConfirmer.getCheckBoxConfirmerBlocksLoading);

// -----------------
// ------ date-picker
export const getDatePickerState = createSelector(getBlocksState, state => state.datePicker);

export const getDatePickerIds = createSelector(getDatePickerState, fromDatePicker.getDatePickerIds);
export const getDatePickerEntities = createSelector(getDatePickerState, fromDatePicker.getDatePickerEntities);
export const getAllDatePicker = createSelector(getDatePickerState, fromDatePicker.getAllDatePicker);
export const getTotalDatePicker = createSelector(getDatePickerState, fromDatePicker.getTotalDatePicker);
export const getDatePickerBlocksValidity = createSelector(getDatePickerState, fromDatePicker.getDatePickerBlocksValidity);
export const getDatePickerBlocksLoading = createSelector(getDatePickerState, fromDatePicker.getDatePickerBlocksLoading);

// -------- dropdown
export const getDropdownState = createSelector(getBlocksState, state => state.dropdown);

export const getDropdownIds = createSelector(getDropdownState, fromDropdown.getDropdownIds);
export const getDropdownEntities = createSelector(getDropdownState, fromDropdown.getDropdownEntities);
export const getAllDropdown = createSelector(getDropdownState, fromDropdown.getAllDropdown);
export const getTotalDropdown = createSelector(getDropdownState, fromDropdown.getTotalDropdown);
export const getDropdownBlocksValidity = createSelector(getDropdownState, fromDropdown.getDropdownBlocksValidity);
export const getDropdownBlocksLoading = createSelector(getDropdownState, fromDropdown.getDropdownBlocksLoading);

// ------ text-input
export const getTextInputState = createSelector(getBlocksState, state => state.textInput);

export const getTextInputIds = createSelector(getTextInputState, fromTextInput.getTextInputIds);
export const getTextInputEntities = createSelector(getTextInputState, fromTextInput.getTextInputEntities);
export const getAllTextInput = createSelector(getTextInputState, fromTextInput.getAllTextInput);
export const getTotalTextInput = createSelector(getTextInputState, fromTextInput.getTotalTextInput);
export const getTextInputBlocksValidity = createSelector(getTextInputState, fromTextInput.getTextInputBlocksValidity);
export const getTextInputBlocksLoading = createSelector(getTextInputState, fromTextInput.getTextInputBlocksLoading);
