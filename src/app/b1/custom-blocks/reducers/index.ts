import { InjectionToken } from "@angular/core";
import { createSelector, createFeatureSelector, combineReducers, ActionReducerMap } from "@ngrx/store";

import { CheckBoxConfirmerBlock } from "../models";

import * as fromRoot from "../../../reducers";
import { fromDynamicForm, Block } from "../../../dynamic-blocks-list/dynamic-blocks-list.module";
import * as fromEditBlocks from "./blocks";
import * as fromCheckBoxConfirmer from "./blocks/check-box-confirmer/check-box-confirmer.reducer";

export interface B1BlocksState {
  editBlocks: fromEditBlocks.State;
}

export interface State extends fromRoot.State {
  b1Blocks: B1BlocksState;
}

// -----------------
// ------------ AOT
export const TOKEN = new InjectionToken<ActionReducerMap<fromEditBlocks.State>>("B1BlocksEditBlocksReducers");

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
export const getB1BlocksState = createFeatureSelector<B1BlocksState>("b1Blocks");

// -----------------
// ----- edit blocks
export const getEditBlocksState = createSelector(getB1BlocksState, state => state.editBlocks);

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
  fromDynamicForm.getAllEditBlocksState,
  getAllCheckBoxConfirmer,
  (blocks: Block[], checkBoxConfirmerBlocks: CheckBoxConfirmerBlock[]) => {
    return [
      ...blocks,
      ...checkBoxConfirmerBlocks,
    ];
  },
);

export const getAllEditBlocksValidityState = createSelector(
  fromDynamicForm.getAllEditBlocksValidityState,
  getCheckBoxConfirmerBlocksValidityState,
  (validity: boolean, checkBoxConfirmerValidity: boolean) => {
    return validity && checkBoxConfirmerValidity;
  }
);
