import { Action } from "@ngrx/store";

import { DropdownBlock } from "../../models";

export enum DropdownActionTypes {
  LOADING = "[Dropdown] Loading",
  ADD_BLOCKS = "[Dropdown] Add blocks",
  UPDATE_BLOCK = "[Dropdown] Update block",
}

export class Loading implements Action {
  readonly type = DropdownActionTypes.LOADING;

  constructor(public payload: { id: number, loading: boolean }) {
  }
}

export class AddBlocks implements Action {
  readonly type = DropdownActionTypes.ADD_BLOCKS;

  constructor(public payload: { blocks: DropdownBlock[] }) {
  }
}

export class UpdateBlock implements Action {
  readonly type = DropdownActionTypes.UPDATE_BLOCK;

  constructor(public payload: { block: { id: number, changes: DropdownBlock } }) {
  }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type DropdownActions =
  Loading |
  AddBlocks |
  UpdateBlock;
