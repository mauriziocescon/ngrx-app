import { createSelector, createFeatureSelector } from "@ngrx/store";

import * as fromLanguage from "./language.reducer";
import * as fromModalAlerts from "./modal-alert.reducer";
import * as fromModalConfirmers from "./modal-confirmer.reducer";

export interface CoreState {
  language: fromLanguage.State;
  modalAlerts: fromModalAlerts.State;
  modalConfirmers: fromModalConfirmers.State;
}

export const reducers = {
  language: fromLanguage.reducer,
  modalAlerts: fromModalAlerts.reducer,
  modalConfirmers: fromModalConfirmers.reducer,
};

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `core` state.
 *
 * Selectors are used with the `select` operator.
 *
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getCoreState = createFeatureSelector<CoreState>("core");

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const getLanguageState = createSelector(
  getCoreState,
  state => state.language.selectedLanguage,
);

export const getModalAlertsState = createSelector(
  getCoreState,
  state => state.modalAlerts,
);

export const getModalConfirmersState = createSelector(
  getCoreState,
  state => state.modalConfirmers,
);

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reducers boilerplate
 * in selecting records from the entity state.
 */
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
