import { LanguageActions, LanguageActionTypes } from "../actions/language.actions";

export interface State {
  selectedLanguage: string;
}

export const initialState: State = {
  selectedLanguage: undefined,
};

export function reducer(state = initialState, action: LanguageActions): State {
  switch (action.type) {
    case LanguageActionTypes.SET_LANGUAGE: {
      return {
        ...state,
        selectedLanguage: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
