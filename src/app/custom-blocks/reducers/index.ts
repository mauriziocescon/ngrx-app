import { createSelector, createFeatureSelector, combineReducers } from "@ngrx/store";

import * as fromRoot from "../../reducers";
import * as fromEditBlocks from "./blocks";

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

export {
  getTextInputConfirmerState,
  getTextInputConfirmerIds,
  getTextInputConfirmerEntities,
  getAllTextInputConfirmer,
  getTotalTextInputConfirmer,
  getTextInputConfirmerBlocksValidityState,
  getTextInputConfirmerBlocksLoadingState,

  getAllEditBlocksState,
  getAllEditBlocksValidityState,
} from "./blocks";
