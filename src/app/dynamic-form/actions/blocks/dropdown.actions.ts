import { Action } from "@ngrx/store";

import { DropdownBlock } from "../../models";

export enum DropdownActionTypes {
  DROPDOWN_UPDATE_BLOCK = "[Dropdown] Value did change",
}

export class ValueDidChange implements Action {
  readonly type = DropdownActionTypes.DROPDOWN_UPDATE_BLOCK;

  constructor(public payload: { block: { id: number, changes: DropdownBlock } }) {
  }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type DropdownActions =
  ValueDidChange;
