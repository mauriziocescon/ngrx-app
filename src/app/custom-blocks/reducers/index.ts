import { createSelector, createFeatureSelector, combineReducers } from "@ngrx/store";

import { Block, fromDynamicForm } from "../../dynamic-form/dynamic-form.module";

import { CheckBoxConfirmerBlock } from "../models";

import * as fromRoot from "../../reducers";
import * as fromEditBlocks from "./blocks";
import * as fromCheckBoxConfirmer from "./blocks/check-box-confirmer/check-box-confirmer.reducer";

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
// ------ check-box-confirmer
export const getCheckBoxConfirmerState = createSelector(getEditBlocksState, state => state.checkBoxConfirmer);

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
  (blocskValidity: boolean, checkBoxConfirmerValidity: boolean) => {
    return blocskValidity && checkBoxConfirmerValidity;
  }
);
