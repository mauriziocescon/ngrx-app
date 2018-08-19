import { InjectionToken } from '@angular/core';
import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import {
  CheckBoxBlock,
  CheckBoxConfirmerBlock,
  DatePickerBlock,
  DropdownBlock,
  TextInputBlock,
} from '../models';

import * as fromRoot from '../../reducers';
import * as fromBlockList from './block-list.reducer';
import * as fromSync from './sync.reducer';
import * as fromCheckBox from './blocks/check-box.reducer';
import * as fromCheckBoxConfirmer from './blocks/check-box-confirmer.reducer';
import * as fromDatePicker from './blocks/date-picker.reducer';
import * as fromDropdown from './blocks/dropdown.reducer';
import * as fromTextInput from './blocks/text-input.reducer';

export interface BlocksState {
  blockList: fromBlockList.State;
  serverSync: fromSync.State;

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
    blockList: fromBlockList.reducer,
    serverSync: fromSync.reducer,

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

// -----------------
// ----- block list
export const getBlockListState = createSelector(getBlocksState, state => state.blockList);

export const getFetchedBlocks = createSelector(getBlockListState, fromBlockList.getFetchedBlocks);
export const getFetchLoading = createSelector(getBlockListState, fromBlockList.getFetchLoading);
export const getFetchError = createSelector(getBlockListState, fromBlockList.getFetchError);

export const getSyncingBlocks = createSelector(getBlockListState, fromBlockList.getSyncingBlocks);
export const getSyncLoading = createSelector(getBlockListState, fromBlockList.getSyncLoading);
export const getSyncError = createSelector(getBlockListState, fromBlockList.getSyncError);

// -----------------
// ----------- sync
export const getServerSyncState = createSelector(getBlocksState, state => state.serverSync);

export const isSyncRequired = createSelector(getServerSyncState, fromSync.isSyncRequired);

// -----------------
// ------- check-box
export const getCheckBoxState = createSelector(getBlocksState, state => state.checkBox);

export const getCheckBoxIds = createSelector(getCheckBoxState, fromCheckBox.getCheckBoxIds);
export const getCheckBoxEntities = createSelector(getCheckBoxState, fromCheckBox.getCheckBoxEntities);
export const getAllCheckBox = createSelector(getCheckBoxState, fromCheckBox.getAllCheckBox);
export const getTotalCheckBox = createSelector(getCheckBoxState, fromCheckBox.getTotalCheckBox);

export const getCheckBoxEntityById = () => {
  return createSelector(
    getCheckBoxEntities,
    (entities: Dictionary<CheckBoxBlock>, props: { id: string }) => {
      return entities[props.id];
    },
  );
};

// -----------------
// ------ check-box-confirmer
export const getCheckBoxConfirmerState = createSelector(getBlocksState, state => state.checkBoxConfirmer);

export const getCheckBoxConfirmerIds = createSelector(getCheckBoxConfirmerState, fromCheckBoxConfirmer.getCheckBoxConfirmerIds);
export const getCheckBoxConfirmerEntities = createSelector(getCheckBoxConfirmerState, fromCheckBoxConfirmer.getCheckBoxConfirmerEntities);
export const getAllCheckBoxConfirmer = createSelector(getCheckBoxConfirmerState, fromCheckBoxConfirmer.getAllCheckBoxConfirmer);
export const getTotalCheckBoxConfirmer = createSelector(getCheckBoxConfirmerState, fromCheckBoxConfirmer.getTotalCheckBoxConfirmer);

export const getCheckBoxConfirmerEntityById = () => {
  return createSelector(
    getCheckBoxConfirmerEntities,
    (entities: Dictionary<CheckBoxConfirmerBlock>, props: { id: string }) => {
      return entities[props.id];
    },
  );
};

// -----------------
// ------ date-picker
export const getDatePickerState = createSelector(getBlocksState, state => state.datePicker);

export const getDatePickerIds = createSelector(getDatePickerState, fromDatePicker.getDatePickerIds);
export const getDatePickerEntities = createSelector(getDatePickerState, fromDatePicker.getDatePickerEntities);
export const getAllDatePicker = createSelector(getDatePickerState, fromDatePicker.getAllDatePicker);
export const getTotalDatePicker = createSelector(getDatePickerState, fromDatePicker.getTotalDatePicker);

export const getDatePickerEntityById = () => {
  return createSelector(
    getDatePickerEntities,
    (entities: Dictionary<DatePickerBlock>, props: { id: string }) => {
      return entities[props.id];
    },
  );
};

// -----------------
// -------- dropdown
export const getDropdownState = createSelector(getBlocksState, state => state.dropdown);

export const getDropdownIds = createSelector(getDropdownState, fromDropdown.getDropdownIds);
export const getDropdownEntities = createSelector(getDropdownState, fromDropdown.getDropdownEntities);
export const getAllDropdown = createSelector(getDropdownState, fromDropdown.getAllDropdown);
export const getTotalDropdown = createSelector(getDropdownState, fromDropdown.getTotalDropdown);

export const getDropdownEntityById = () => {
  return createSelector(
    getDropdownEntities,
    (entities: Dictionary<DropdownBlock>, props: { id: string }) => {
      return entities[props.id];
    },
  );
};

// -----------------
// ------ text-input
export const getTextInputState = createSelector(getBlocksState, state => state.textInput);

export const getTextInputIds = createSelector(getTextInputState, fromTextInput.getTextInputIds);
export const getTextInputEntities = createSelector(getTextInputState, fromTextInput.getTextInputEntities);
export const getAllTextInput = createSelector(getTextInputState, fromTextInput.getAllTextInput);
export const getTotalTextInput = createSelector(getTextInputState, fromTextInput.getTotalTextInput);

export const getTextInputEntityById = () => {
  return createSelector(
    getTextInputEntities,
    (entities: Dictionary<TextInputBlock>, props: { id: string }) => {
      return entities[props.id];
    },
  );
};
