import { Action } from "@ngrx/store";

import { CheckBoxConfirmerBlock } from "../../models";

export enum CheckBoxConfirmerActionTypes {
  LOADING = "[CheckBoxConfirmerBlock] Loading",
  ADD_BLOCKS = "[CheckBoxConfirmerBlock] Add blocks",
  UPDATE_BLOCK = "[CheckBoxConfirmerBlock] Update block",
}

export class Loading implements Action {
  readonly type = CheckBoxConfirmerActionTypes.LOADING;

  constructor(public payload: { id: number, loading: boolean }) {
  }
}

export class AddBlocks implements Action {
  readonly type = CheckBoxConfirmerActionTypes.ADD_BLOCKS;

  constructor(public payload: { blocks: CheckBoxConfirmerBlock[] }) {
  }
}

export class UpdateBlock implements Action {
  readonly type = CheckBoxConfirmerActionTypes.UPDATE_BLOCK;

  constructor(public payload: { block: { id: number, changes: CheckBoxConfirmerBlock }, notify: boolean }) {
  }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type CheckBoxConfirmerActions =
  Loading |
  AddBlocks |
  UpdateBlock;
