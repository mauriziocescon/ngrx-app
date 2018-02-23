import { Action } from "@ngrx/store";
import { Update } from "@ngrx/entity";

import { DropdownBlock } from "../../../models";

export enum DropdownActionTypes {
  LOADING = "[Dropdown] Loading",
  ADD_BLOCKS = "[Dropdown] Add blocks",
  UPDATE_BLOCK = "[Dropdown] Update block",
  CLEAR_BLOCKS = "[Dropdown] Clear blocks",
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

  constructor(public payload: { block: Update<DropdownBlock>, notify: boolean }) {
  }
}

export class ClearBlocks implements Action {
  readonly type = DropdownActionTypes.CLEAR_BLOCKS;
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type DropdownActions =
  Loading |
  AddBlocks |
  UpdateBlock |
  ClearBlocks;
