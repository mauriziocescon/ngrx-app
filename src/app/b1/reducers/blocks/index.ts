import { ActionReducerMap } from "@ngrx/store";

import * as fromCheckBoxConfirmer from "./check-box-confirmer/check-box-confirmer.reducer";

export interface State {
  checkBoxConfirmer: fromCheckBoxConfirmer.State;
}

export const reducers: ActionReducerMap<State, any> = {
  checkBoxConfirmer: fromCheckBoxConfirmer.reducer,
};

export const getCheckBoxConfirmerState = (state: State) => state.checkBoxConfirmer;
