import { ActionReducerMap } from '@ngrx/store';

import * as fromDatePicker from './date-picker/date-picker.reducer';

export interface State {
  datePicker: fromDatePicker.State;
}

export const reducers: ActionReducerMap<State, any> = {
  datePicker: fromDatePicker.reducer,
};

export const getDatePickerState = (state: State) => state.datePicker;
