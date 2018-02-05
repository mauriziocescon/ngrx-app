import { Action } from "@ngrx/store";

import { Block } from "../models";

export enum ListActionTypes {
  FETCH_BLOCKS = "[List] Fetch blocks",
  FETCH_BLOCKS_COMPLETE = "[List] Fetch blocks complete",
  FETCH_BLOCKS_ERROR = "[List] Fetch blocks error",
  CLEAR_BLOCKS = "[List] Clear blocks",
}

export class FetchBlocks implements Action {
  readonly type = ListActionTypes.FETCH_BLOCKS;

  constructor(public payload: { module: string, instance: string, step: string }) {
  }
}

export class FetchBlocksComplete implements Action {
  readonly type = ListActionTypes.FETCH_BLOCKS_COMPLETE;

  constructor(public payload: Block[]) {
  }
}

export class FetchBlocksError implements Action {
  readonly type = ListActionTypes.FETCH_BLOCKS_ERROR;

  constructor(public payload: any) {
  }
}

export class ClearBlocks implements Action {
  readonly type = ListActionTypes.CLEAR_BLOCKS;
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ListActions =
  FetchBlocks |
  FetchBlocksComplete |
  FetchBlocksError |
  ClearBlocks;
