import { createFeature, createReducer, on } from '@ngrx/store';

import { ModalAlert, ModalConfirmer, ModalConfirmerResultType } from '../models';

import { actionGroup } from './core.actions';

interface State {
  selectedLanguage: string;
  modalAlerts: { [id: string]: ModalAlert } | undefined;
  modalConfirmers: { [id: string]: ModalConfirmer } | undefined;
  modalConfirmerResults: { [id: string]: ModalConfirmerResultType | undefined };
}

const initialState: State = {
  selectedLanguage: 'en',
  modalAlerts: {},
  modalConfirmers: {},
  modalConfirmerResults: {},
};

export const feature = createFeature({
  name: `core`,
  reducer: createReducer(
    initialState,

    on(actionGroup.setLanguage, (state, action) => ({
      ...state,
      selectedLanguage: action.lang,
    })),

    on(actionGroup.showModalAlert, (state, action) => ({
      ...state,
      modalAlerts: { ...state.modalAlerts, [action.modal.id]: action.modal },
    })),
    on(actionGroup.dismissModalAlert, (state, action) => ({
      ...state,
      modalAlerts: { ...state.modalAlerts, [action.id]: undefined },
    })),

    on(actionGroup.showModalConfirmer, (state, action) => ({
      ...state,
      modalConfirmers: { ...state.modalConfirmers, [action.modal.id]: action.modal },
    })),
    on(actionGroup.dismissModalConfirmerWithPositiveResult, (state, action) => ({
      ...state,
      modalConfirmers: { ...state.modalConfirmers, [action.id]: undefined },
      modalConfirmerResults: { ...state.modalConfirmerResults, [action.id]: ModalConfirmerResultType.Positive },
    })),
    on(actionGroup.dismissModalConfirmerWithNegativeResult, (state, action) => ({
      ...state,
      modalConfirmers: { ...state.modalConfirmers, [action.id]: undefined },
      modalConfirmerResults: { ...state.modalConfirmerResults, [action.id]: ModalConfirmerResultType.Negative },
    })),
    on(actionGroup.dismissModalConfirmer, (state, action) => ({
      ...state,
      modalConfirmers: { ...state.modalConfirmers, [action.id]: undefined },
      modalConfirmerResults: { ...state.modalConfirmerResults, [action.id]: ModalConfirmerResultType.Dismiss },
    })),
    on(actionGroup.cleanModalConfirmer, (state, action) => ({
      ...state,
      modalConfirmerResults: { ...state.modalConfirmerResults, [action.id]: undefined },
    })),

    on(actionGroup.clear, (state, action) => initialState),
  ),
  extraSelectors: ({}) => ({}),
});
