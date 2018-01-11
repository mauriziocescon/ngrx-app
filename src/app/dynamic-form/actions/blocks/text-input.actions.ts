import { Action } from "@ngrx/store";

import { TextInputBlock } from "../../models";

export enum TextInputActionTypes {
  TEXT_INPUT_LOADING = "[TextInput] Loading",
  TEXT_INPUT_UPDATE_BLOCK = "[TextInput] Value did change",
}

export class Loading implements Action {
  readonly type = TextInputActionTypes.TEXT_INPUT_LOADING;

  constructor(public payload: { id: number, loading: boolean }) {
  }
}

export class ValueDidChange implements Action {
  readonly type = TextInputActionTypes.TEXT_INPUT_UPDATE_BLOCK;

  constructor(public payload: { block: { id: number, changes: TextInputBlock } }) {
  }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type TextInputActions =
  Loading |
  ValueDidChange;
