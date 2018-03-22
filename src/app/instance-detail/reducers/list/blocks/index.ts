import { ActionReducerMap } from '@ngrx/store';

import * as fromCheckBox from './check-box/check-box.reducer';
import * as fromDropdown from './dropdown/dropdown.reducer';
import * as fromTextInput from './text-input/text-input.reducer';

export interface State {
  checkBox: fromCheckBox.State;
  dropdown: fromDropdown.State;
  textInput: fromTextInput.State;
}

export const reducers: ActionReducerMap<State, any> = {
  checkBox: fromCheckBox.reducer,
  dropdown: fromDropdown.reducer,
  textInput: fromTextInput.reducer,
};

export const getCheckBoxState = (state: State) => state.checkBox;
export const getDropdownState = (state: State) => state.dropdown;
export const getTextInputState = (state: State) => state.textInput;
