import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import { CoreState } from '../reducers';

import * as fromLanguage from '../reducers/language.reducer';
import * as fromModalAlerts from '../reducers/modal-alert.reducer';
import * as fromModalConfirmers from '../reducers/modal-confirmer.reducer';

export const getCoreState = createFeatureSelector<CoreState>('core');

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
