import { Action } from "@ngrx/store";

import { DatePickerBlock } from "../../models";

export enum DatePickerActionTypes {
  LOADING = "[DatePickerBlock] Loading",
  ADD_BLOCKS = "[DatePickerBlock] Add blocks",
  UPDATE_BLOCK = "[DatePickerBlock] Update block",
  CLEAR_BLOCKS = "[DatePickerBlock] Clear blocks",
}

export class Loading implements Action {
  readonly type = DatePickerActionTypes.LOADING;

  constructor(public payload: { id: number, loading: boolean }) {
  }
}

export class AddBlocks implements Action {
  readonly type = DatePickerActionTypes.ADD_BLOCKS;

  constructor(public payload: { blocks: DatePickerBlock[] }) {
  }
}

export class UpdateBlock implements Action {
  readonly type = DatePickerActionTypes.UPDATE_BLOCK;

  constructor(public payload: { block: { id: number, changes: DatePickerBlock }, notify: boolean }) {
  }
}

export class ClearBlocks implements Action {
  readonly type = DatePickerActionTypes.CLEAR_BLOCKS;
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type DatePickerActions =
  Loading |
  AddBlocks |
  UpdateBlock |
  ClearBlocks;
