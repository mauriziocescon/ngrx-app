import { Action } from "@ngrx/store";

import { TextInputConfirmerBlock } from "../../models";

export enum TextInputConfirmerActionTypes {
  LOADING = "[TextInputConfirmer] Loading",
  ADD_BLOCKS = "[TextInputConfirmer] Add blocks",
  UPDATE_BLOCK = "[TextInputConfirmer] Update block",
}

export class Loading implements Action {
  readonly type = TextInputConfirmerActionTypes.LOADING;

  constructor(public payload: { id: number, loading: boolean }) {
  }
}

export class AddBlocks implements Action {
  readonly type = TextInputConfirmerActionTypes.ADD_BLOCKS;

  constructor(public payload: { blocks: TextInputConfirmerBlock[] }) {
  }
}

export class UpdateBlock implements Action {
  readonly type = TextInputConfirmerActionTypes.UPDATE_BLOCK;

  constructor(public payload: { block: { id: number, changes: TextInputConfirmerBlock }, notify: boolean }) {
  }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type TextInputConfirmerActions =
  Loading |
  AddBlocks |
  UpdateBlock;
