import { createSelector, createFeatureSelector, combineReducers } from "@ngrx/store";

import { TextInputConfirmerBlock } from "../models";

import * as fromRoot from "../../../reducers";
import * as fromEditBlocks from "./blocks";
import * as fromTextInputConfirmer from "./blocks/text-input-confirmer/text-input-confirmer.reducer";

export interface CustomBlocksState {
  editBlocks: fromEditBlocks.State;
}

export interface State extends fromRoot.State {
  customBlocks: CustomBlocksState;
}

export const reducers = {
  editBlocks: combineReducers(fromEditBlocks.reducers),
};

export const getCustomBlocksState = createFeatureSelector<CustomBlocksState>("customBlocks");

// -----------------
// ----- edit blocks
export const getEditBlocksState = createSelector(getCustomBlocksState, state => state.editBlocks);

// -----------------
// ------ text-input-confirmer
export const getTextInputConfirmerState = createSelector(getEditBlocksState, state => state.textInputConfirmer);

export const getTextInputConfirmerIds = createSelector(getTextInputConfirmerState, fromTextInputConfirmer.getTextInputConfirmerIds);
export const getTextInputConfirmerEntities = createSelector(getTextInputConfirmerState, fromTextInputConfirmer.getTextInputConfirmerEntities);
export const getAllTextInputConfirmer = createSelector(getTextInputConfirmerState, fromTextInputConfirmer.getAllTextInputConfirmer);
export const getTotalTextInputConfirmer = createSelector(getTextInputConfirmerState, fromTextInputConfirmer.getTotalTextInputConfirmer);
export const getTextInputConfirmerBlocksValidityState = createSelector(getTextInputConfirmerState, fromTextInputConfirmer.getTextInputConfirmerBlocksValidityState);
export const getTextInputConfirmerBlocksLoadingState = createSelector(getTextInputConfirmerState, fromTextInputConfirmer.getTextInputConfirmerBlocksLoadingState);

// -----------------
// --------- generic
export const getAllEditBlocksState = createSelector(
  getAllTextInputConfirmer,
  (textInputConfirmerBlocks: TextInputConfirmerBlock[]) => {
    return [
      ...textInputConfirmerBlocks,
    ];
  },
);

export const getAllEditBlocksValidityState = createSelector(
  getTextInputConfirmerBlocksValidityState,
  (textInputConfirmerValidity: boolean) => {
    return textInputConfirmerValidity;
  }
);
