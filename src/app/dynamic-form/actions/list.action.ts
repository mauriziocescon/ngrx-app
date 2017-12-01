import { Action } from "@ngrx/store";

import { Block } from "../models/block";

export const FETCH_BLOCKS = "[List] Fetch blocks";
export const FETCH_BLOCKS_COMPLETE = "[List] Fetch blocks complete";
export const FETCH_BLOCKS_ERROR = "[List] Fetch blocks error";

export class FetchBlocks implements Action {
  readonly type = FETCH_BLOCKS;
}

export class FetchBlocksComplete implements Action {
  readonly type = FETCH_BLOCKS_COMPLETE;

  constructor(public payload: Block[]) {
  }
}

export class FetchBlocksError implements Action {
  readonly type = FETCH_BLOCKS_ERROR;

  constructor(public payload: any) {
  }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions =
  FetchBlocks |
  FetchBlocksComplete |
  FetchBlocksError;
