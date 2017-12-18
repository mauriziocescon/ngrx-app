import { Action } from "@ngrx/store";

import { Block } from "../models";

export enum TextInputActionTypes {
  TEXT_INPUT_VALUE_DID_CHANGE = "[TextInput] Value did change",
}

export class ValueDidChange implements Action {
  readonly type = TextInputActionTypes.TEXT_INPUT_VALUE_DID_CHANGE;

  constructor(public payload: Block) {
  }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type TextInputActions =
  ValueDidChange;
