import * as fromCheckBoxConfirmer from "./check-box-confirmer/check-box-confirmer.reducer";

export interface State {
  checkBoxConfirmer: fromCheckBoxConfirmer.State;
}

export const reducers = {
  checkBoxConfirmer: fromCheckBoxConfirmer.reducer,
};
