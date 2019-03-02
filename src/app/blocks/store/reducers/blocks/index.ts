import { ActionReducerMap } from '@ngrx/store';

import * as fromCheckBox from './check-box.reducer';
import * as fromCheckBoxConfirmer from './check-box-confirmer.reducer';
import * as fromDatePicker from './date-picker.reducer';
import * as fromDropdown from './dropdown.reducer';
import * as fromTextInput from './text-input.reducer';

export interface State {
  checkBox: fromCheckBox.State;
  checkBoxConfirmer: fromCheckBoxConfirmer.State;
  datePicker: fromDatePicker.State;
  dropdown: fromDropdown.State;
  textInput: fromTextInput.State;
}

export const reducers: ActionReducerMap<State, any> = {
  checkBox: fromCheckBox.reducer,
  checkBoxConfirmer: fromCheckBoxConfirmer.reducer,
  datePicker: fromDatePicker.reducer,
  dropdown: fromDropdown.reducer,
  textInput: fromTextInput.reducer,
};

export const getCheckBoxState = (state: State) => state.checkBox;
export const getCheckBoxConfirmerState = (state: State) => state.checkBoxConfirmer;
export const getDatePickerState = (state: State) => state.datePicker;
export const getDropdownState = (state: State) => state.dropdown;
export const getTextInputState = (state: State) => state.textInput;
