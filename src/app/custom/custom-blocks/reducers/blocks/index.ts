import { createSelector, createFeatureSelector } from "@ngrx/store";

import * as fromTextInputConfirmer from "./text-input-confirmer/text-input-confirmer.reducer";

import { TextInputConfirmerBlock } from "../../models";

export interface State {
  textInputConfirmer: fromTextInputConfirmer.State;
}

export const reducers = {
  textInputConfirmer: fromTextInputConfirmer.reducer,
};

export const getDynamicFormState = createFeatureSelector<any>("dynamicForm");

export const getEditBlocksState = createSelector(
  getDynamicFormState,
  state => state.editBlocks,
);

// -----------------
// ------- text-input-confirmer
export const getTextInputConfirmerState = createSelector(
  getEditBlocksState,
  state => state.textInputConfirmer,
);

export const {
  selectIds: getTextInputConfirmerIds,
  selectEntities: getTextInputConfirmerEntities,
  selectAll: getAllTextInputConfirmer,
  selectTotal: getTotalTextInputConfirmer,
} = fromTextInputConfirmer.adapter.getSelectors(getTextInputConfirmerState);

export const getTextInputConfirmerBlocksValidityState = createSelector(
  getTextInputConfirmerIds,
  getTextInputConfirmerEntities,
  (ids: number[], blocksEntities: { [id: string]: any }) => {
    return ids.findIndex((id: number) => {
      return blocksEntities[id].valid === false;
    }) === -1;
  }
);

export const getTextInputConfirmerBlocksLoadingState = createSelector(
  getTextInputConfirmerState,
  state => state.textInputConfirmerBlocksLoading,
);

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

