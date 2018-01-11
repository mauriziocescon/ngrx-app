import { Action } from "@ngrx/store";

import { TextInputBlock } from "../../models";

export enum TextInputActionTypes {
  LOADING = "[TextInput] Loading",
  ADD_BLOCKS = "[TextInput] Add blocks",
  UPDATE_BLOCK = "[TextInput] Update block",
}

export class Loading implements Action {
  readonly type = TextInputActionTypes.LOADING;

  constructor(public payload: { id: number, loading: boolean }) {
  }
}

export class AddBlocks implements Action {
  readonly type = TextInputActionTypes.ADD_BLOCKS;

  constructor(public payload: { blocks: TextInputBlock[] }) {
  }
}

export class UpdateBlock implements Action {
  readonly type = TextInputActionTypes.UPDATE_BLOCK;

  constructor(public payload: { block: { id: number, changes: TextInputBlock } }) {
  }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type TextInputActions =
  Loading |
  AddBlocks |
  UpdateBlock;
