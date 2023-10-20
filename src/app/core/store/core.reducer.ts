import { createFeature, createReducer, on } from '@ngrx/store';

import { ModalAlert, ModalConfirmer, ModalConfirmerResultType } from '../models';

import { coreActions } from './core.actions';

interface State {
  selectedLanguage: string;
  modalAlerts: { [id: string]: ModalAlert } | undefined;
  modalConfirmers: { [id: string]: ModalConfirmer } | undefined;
  modalConfirmerResults: { [id: string]: ModalConfirmerResultType | undefined };
}

const initialState: State = {
  selectedLanguage: 'en',
  modalAlerts: undefined,
  modalConfirmers: undefined,
  modalConfirmerResults: undefined,
};

export const coreFeature = createFeature({
  name: `ngrxApp_core`,
  reducer: createReducer(
    initialState,

    on(coreActions.setLanguage, (state, action) => ({
      ...state,
      selectedLanguage: action.lang,
    })),

    on(coreActions.showModalAlert, (state, action) => ({
      ...state,
      modalAlerts: { ...state.modalAlerts, [action.modal.id]: action.modal },
    })),
    on(coreActions.dismissModalAlert, (state, action) => ({
      ...state,
      modalAlerts: { ...state.modalAlerts, [action.id]: undefined },
    })),

    on(coreActions.showModalConfirmer, (state, action) => ({
      ...state,
      modalConfirmers: { ...state.modalConfirmers, [action.modal.id]: action.modal },
    })),
    on(coreActions.dismissModalConfirmerWithPositiveResult, (state, action) => ({
      ...state,
      modalConfirmers: { ...state.modalConfirmers, [action.id]: undefined },
      modalConfirmerResults: { ...state.modalConfirmerResults, [action.id]: ModalConfirmerResultType.Positive },
    })),
    on(coreActions.dismissModalConfirmerWithPositiveResult, (state, action) => ({
      ...state,
      modalConfirmers: { ...state.modalConfirmers, [action.id]: undefined },
      modalConfirmerResults: { ...state.modalConfirmerResults, [action.id]: ModalConfirmerResultType.Negative },
    })),
    on(coreActions.dismissModalConfirmer, (state, action) => ({
      ...state,
      modalConfirmers: { ...state.modalConfirmers, [action.id]: undefined },
      modalConfirmerResults: { ...state.modalConfirmerResults, [action.id]: ModalConfirmerResultType.Dismiss },
    })),
    on(coreActions.cleanModalConfirmer, (state, action) => ({
      ...state,
      modalConfirmerResults: { ...state.modalConfirmerResults, [action.id]: undefined },
    })),

    on(coreActions.clear, (state, action) => initialState),
  ),
  extraSelectors: ({}) => ({}),
});
