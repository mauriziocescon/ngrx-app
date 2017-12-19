import { Action } from "@ngrx/store";

import { Block } from "../models";

export enum EditBlocksActionTypes {
  ADD_BLOCKS = "[EditBlocks] Add blocks",
}

export class AddBlocks implements Action {
  readonly type = EditBlocksActionTypes.ADD_BLOCKS;

  constructor(public payload: {blocks: Block[]}) {
  }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type EditBlocksActions =
  AddBlocks;
