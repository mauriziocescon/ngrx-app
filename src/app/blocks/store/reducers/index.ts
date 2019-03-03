import { InjectionToken } from '@angular/core';
import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import {
  CheckBoxBlock,
  CheckBoxConfirmerBlock,
  DatePickerBlock,
  DropdownBlock,
  TextInputBlock,
} from '../../models';

import * as fromRoot from '../../../reducers';
import * as fromBlockList from './block-list.reducer';
import * as fromCheckBox from './blocks/check-box.reducer';
import * as fromCheckBoxConfirmer from './blocks/check-box-confirmer.reducer';
import * as fromDatePicker from './blocks/date-picker.reducer';
import * as fromDropdown from './blocks/dropdown.reducer';
import * as fromTextInput from './blocks/text-input.reducer';

export interface BlocksState {
  blockList: fromBlockList.State;

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
