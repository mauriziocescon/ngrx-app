import { createFeature, createReducer, on } from '@ngrx/store';

import { actionGroup } from './core.actions';

interface State {
  selectedLanguage: string;
}

const initialState: State = {
  selectedLanguage: 'en',
};

export const feature = createFeature({
  name: `core`,
  reducer: createReducer(
    initialState,

    on(actionGroup.setLanguage, (state, action) => ({
      ...state,
      selectedLanguage: action.lang,
    })),

    on(actionGroup.clear, (state, action) => initialState),
  ),
  extraSelectors: ({}) => ({}),
});
