import * as fromCheckBoxConfirmer from "./date-picker/date-picker.reducer";

export interface State {
  checkBoxConfirmer: fromCheckBoxConfirmer.State;
}

export const reducers = {
  checkBoxConfirmer: fromCheckBoxConfirmer.reducer,
};

export const getCheckBoxConfirmerState = (state: State) => state.checkBoxConfirmer;
