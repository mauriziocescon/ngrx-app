import { Action } from "@ngrx/store";

import { CheckBoxBlock } from "../../models";

export enum CheckBoxActionTypes {
  CHECK_BOX_UPDATE_BLOCK = "[CheckBox] Value did change",
}

export class ValueDidChange implements Action {
  readonly type = CheckBoxActionTypes.CHECK_BOX_UPDATE_BLOCK;

  constructor(public payload: { block: { id: number, changes: CheckBoxBlock } }) {
  }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type CheckBoxActions =
  ValueDidChange;
