import * as fromTextInputConfirmer from "./text-input-confirmer/text-input-confirmer.reducer";

export interface State {
  textInputConfirmer: fromTextInputConfirmer.State;
}

export const reducers = {
  textInputConfirmer: fromTextInputConfirmer.reducer,
};
