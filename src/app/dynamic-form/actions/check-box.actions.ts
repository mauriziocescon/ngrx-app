import { Action } from "@ngrx/store";

import { Block } from "../models";

export enum CheckBoxActionTypes {
  CHECK_BOX_VALUE_DID_CHANGE = "[CheckBox] Value did change",
}

export class ValueDidChange implements Action {
  readonly type = CheckBoxActionTypes.CHECK_BOX_VALUE_DID_CHANGE;

  constructor(public payload: Block) {
  }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type CheckBoxActions =
  ValueDidChange;
