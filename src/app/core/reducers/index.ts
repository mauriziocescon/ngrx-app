import { createSelector, createFeatureSelector, ActionReducerMap } from "@ngrx/store";

import * as fromLanguage from "./language.reducer";
import * as fromModalAlerts from "./modal-alert.reducer";
import * as fromModalConfirmers from "./modal-confirmer.reducer";

export interface CoreState {
  language: fromLanguage.State;
  modalAlerts: fromModalAlerts.State;
  modalConfirmers: fromModalConfirmers.State;
}

export const reducers: ActionReducerMap<CoreState> = {
  language: fromLanguage.reducer,
  modalAlerts: fromModalAlerts.reducer,
  modalConfirmers: fromModalConfirmers.reducer,
};

export const getCoreState = createFeatureSelector<CoreState>("core");

export const getLanguageState = createSelector(getCoreState, state => state.language.selectedLanguage);
export const getModalAlertsState = createSelector(getCoreState, state => state.modalAlerts);
export const getModalConfirmersState = createSelector(getCoreState, state => state.modalConfirmers);

export const {
  selectIds: getModalAlertsIds,
  selectEntities: getModalAlertsEntities,
  selectAll: getAllModalAlerts,
  selectTotal: getTotalModalAlerts,
} = fromModalAlerts.adapter.getSelectors(getModalAlertsState);

export const {
  selectIds: getModalConfirmersIds,
  selectEntities: getModalConfirmersEntities,
  selectAll: getAllModalConfirmers,
  selectTotal: getTotalModalConfirmers,
} = fromModalConfirmers.adapter.getSelectors(getModalConfirmersState);

export const getModalConfirmerResults = createSelector(
  getModalConfirmersState,
  state => state.modalConfirmerResults,
);
