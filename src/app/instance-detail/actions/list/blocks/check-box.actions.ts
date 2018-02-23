import { Action } from "@ngrx/store";
import { Update } from "@ngrx/entity";

import { CheckBoxBlock } from "../../../models";

export enum CheckBoxActionTypes {
  LOADING = "[CheckBox] Loading",
  ADD_BLOCKS = "[CheckBox] Add blocks",
  UPDATE_BLOCK = "[CheckBox] Update block",
  CLEAR_BLOCKS = "[CheckBox] Clear blocks",
}

export class Loading implements Action {
  readonly type = CheckBoxActionTypes.LOADING;

  constructor(public payload: { id: number, loading: boolean }) {
  }
}

export class AddBlocks implements Action {
  readonly type = CheckBoxActionTypes.ADD_BLOCKS;

  constructor(public payload: Update<CheckBoxBlock>[]) {
  }
}

export class UpdateBlock implements Action {
  readonly type = CheckBoxActionTypes.UPDATE_BLOCK;

  constructor(public payload: { block: Update<CheckBoxBlock>, notify: boolean }) {
  }
}

export class ClearBlocks implements Action {
  readonly type = CheckBoxActionTypes.CLEAR_BLOCKS;
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type CheckBoxActions =
  Loading |
  AddBlocks |
  UpdateBlock |
  ClearBlocks;
