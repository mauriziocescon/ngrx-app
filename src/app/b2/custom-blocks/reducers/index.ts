import { InjectionToken } from "@angular/core";
import { createSelector, createFeatureSelector, combineReducers, ActionReducerMap } from "@ngrx/store";

import { CheckBoxConfirmerBlock } from "../models";

import * as fromRoot from "../../../reducers";
import * as fromEditBlocks from "./blocks";
import * as fromCheckBoxConfirmer from "./blocks/date-picker/date-picker.reducer";

export interface B2BlocksState {
  editBlocks: fromEditBlocks.State;
}

export interface State extends fromRoot.State {
  b2Blocks: B2BlocksState;
}

// -----------------
// ------------ AOT
export const TOKEN = new InjectionToken<ActionReducerMap<fromEditBlocks.State>>("B2BlocksEditBlocksReducers");

export const getReducers = () => {
  return {
    editBlocks: combineReducers(fromEditBlocks.reducers),
  };
};

export const reducerProvider = [
  {provide: TOKEN, useFactory: getReducers}
];

// -----------------
// --- feature selector
export const getB2BlocksState = createFeatureSelector<B2BlocksState>("b2Blocks");

// -----------------
// ----- edit blocks
export const getEditBlocksState = createSelector(getB2BlocksState, state => state.editBlocks);

// -----------------
// ------ check-box-confirmer
export const getCheckBoxConfirmerState = createSelector(getEditBlocksState, fromEditBlocks.getCheckBoxConfirmerState);

export const getCheckBoxConfirmerIds = createSelector(getCheckBoxConfirmerState, fromCheckBoxConfirmer.getCheckBoxConfirmerIds);
export const getCheckBoxConfirmerEntities = createSelector(getCheckBoxConfirmerState, fromCheckBoxConfirmer.getCheckBoxConfirmerEntities);
export const getAllCheckBoxConfirmer = createSelector(getCheckBoxConfirmerState, fromCheckBoxConfirmer.getAllCheckBoxConfirmer);
export const getTotalCheckBoxConfirmer = createSelector(getCheckBoxConfirmerState, fromCheckBoxConfirmer.getTotalCheckBoxConfirmer);
export const getCheckBoxConfirmerBlocksValidityState = createSelector(getCheckBoxConfirmerState, fromCheckBoxConfirmer.getCheckBoxConfirmerBlocksValidityState);
export const getCheckBoxConfirmerBlocksLoadingState = createSelector(getCheckBoxConfirmerState, fromCheckBoxConfirmer.getCheckBoxConfirmerBlocksLoadingState);

// -----------------
// --------- generic
export const getAllEditBlocksState = createSelector(
  getAllCheckBoxConfirmer,
  (checkBoxConfirmerBlocks: CheckBoxConfirmerBlock[]) => {
    return [
      ...checkBoxConfirmerBlocks,
    ];
  },
);

export const getAllEditBlocksValidityState = createSelector(
  getCheckBoxConfirmerBlocksValidityState,
  (checkBoxConfirmerValidity: boolean) => {
    return checkBoxConfirmerValidity;
  }
);