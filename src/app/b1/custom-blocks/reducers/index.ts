import { InjectionToken } from "@angular/core";
import { createSelector, createFeatureSelector, combineReducers, ActionReducerMap } from "@ngrx/store";

import { CheckBoxConfirmerBlock } from "../models";

import * as fromRoot from "../../../reducers";
import { fromDynamicBlockList, Block } from "../../../dynamic-block-list/dynamic-block-list.module";
import * as fromEditedBlocks from "./blocks";
import * as fromCheckBoxConfirmer from "./blocks/check-box-confirmer/check-box-confirmer.reducer";

export interface B1BlocksState {
  editedBlocks: fromEditedBlocks.State;
}

export interface State extends fromRoot.State {
  b1Blocks: B1BlocksState;
}

// -----------------
// ------------ AOT
export const TOKEN = new InjectionToken<ActionReducerMap<fromEditedBlocks.State>>("B1EditedBlocksReducers");

export const getReducers = () => {
  return {
    editedBlocks: combineReducers(fromEditedBlocks.reducers),
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
export const getEditedBlocksState = createSelector(getB1BlocksState, state => state.editedBlocks);

// -----------------
// ------ check-box-confirmer
export const getCheckBoxConfirmerState = createSelector(getEditedBlocksState, fromEditedBlocks.getCheckBoxConfirmerState);

export const getCheckBoxConfirmerIds = createSelector(getCheckBoxConfirmerState, fromCheckBoxConfirmer.getCheckBoxConfirmerIds);
export const getCheckBoxConfirmerEntities = createSelector(getCheckBoxConfirmerState, fromCheckBoxConfirmer.getCheckBoxConfirmerEntities);
export const getAllCheckBoxConfirmer = createSelector(getCheckBoxConfirmerState, fromCheckBoxConfirmer.getAllCheckBoxConfirmer);
export const getTotalCheckBoxConfirmer = createSelector(getCheckBoxConfirmerState, fromCheckBoxConfirmer.getTotalCheckBoxConfirmer);
export const getCheckBoxConfirmerBlocksValidityState = createSelector(getCheckBoxConfirmerState, fromCheckBoxConfirmer.getCheckBoxConfirmerBlocksValidityState);
export const getCheckBoxConfirmerBlocksLoadingState = createSelector(getCheckBoxConfirmerState, fromCheckBoxConfirmer.getCheckBoxConfirmerBlocksLoadingState);

// -----------------
// --------- generic
export const getAllEditedBlocksState = createSelector(
  fromDynamicBlockList.getAllEditedBlocksState,
  getAllCheckBoxConfirmer,
  (blocks: Block[], checkBoxConfirmerBlocks: CheckBoxConfirmerBlock[]) => {
    return [
      ...blocks,
      ...checkBoxConfirmerBlocks,
    ];
  },
);

export const getAllEditedBlocksValidityState = createSelector(
  fromDynamicBlockList.getAllEditedBlocksValidityState,
  getCheckBoxConfirmerBlocksValidityState,
  (validity: boolean, checkBoxConfirmerValidity: boolean) => {
    return validity && checkBoxConfirmerValidity;
  }
);
