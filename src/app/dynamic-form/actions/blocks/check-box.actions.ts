import { Action } from "@ngrx/store";

import { CheckBoxBlock } from "../../models";

export enum CheckBoxActionTypes {
  LOADING = "[CheckBox] Loading",
  ADD_BLOCKS = "[CheckBox] Add blocks",
  UPDATE_BLOCK = "[CheckBox] Update block",
}

export class Loading implements Action {
  readonly type = CheckBoxActionTypes.LOADING;

  constructor(public payload: { id: number, loading: boolean }) {
  }
}

export class AddBlocks implements Action {
  readonly type = CheckBoxActionTypes.ADD_BLOCKS;

  constructor(public payload: { blocks: CheckBoxBlock[] }) {
  }
}

export class UpdateBlock implements Action {
  readonly type = CheckBoxActionTypes.UPDATE_BLOCK;

  constructor(public payload: { block: { id: number, changes: CheckBoxBlock } }) {
  }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type CheckBoxActions =
  Loading |
  AddBlocks |
  UpdateBlock;
