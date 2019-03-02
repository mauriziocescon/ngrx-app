import { ActionReducerMap } from '@ngrx/store';

import * as fromLanguage from './language.reducer';
import * as fromModalAlerts from './modal-alert.reducer';
import * as fromModalConfirmers from './modal-confirmer.reducer';

export interface CoreState {
  language: fromLanguage.State;
  modalAlerts: fromModalAlerts.State;
  modalConfirmers: fromModalConfirmers.State;
}

export const reducers: ActionReducerMap<CoreState, any> = {
  language: fromLanguage.reducer,
  modalAlerts: fromModalAlerts.reducer,
  modalConfirmers: fromModalConfirmers.reducer,
};
