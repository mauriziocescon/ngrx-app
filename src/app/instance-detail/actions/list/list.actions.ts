import { Action } from "@ngrx/store";

import { Block } from "../../models";

export enum ListActionTypes {
  FETCH_BLOCKS = "[List] Fetch blocks",
  FETCH_BLOCKS_COMPLETE = "[List] Fetch blocks complete",
  FETCH_BLOCKS_ERROR = "[List] Fetch blocks error",
  UPDATE_BLOCKS = "[List] Update blocks",
  UPDATE_BLOCKS_COMPLETE = "[List] Update blocks complete",
  UPDATE_BLOCKS_ERROR = "[List] Update blocks error",
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

export class UpdateBlocks implements Action {
  readonly type = ListActionTypes.UPDATE_BLOCKS;

  constructor(public payload: { module: string, instance: string, step: string, blocks: Block[] }) {
  }
}

export class UpdateBlocksComplete implements Action {
  readonly type = ListActionTypes.UPDATE_BLOCKS_COMPLETE;
}

export class UpdateBlocksError implements Action {
  readonly type = ListActionTypes.UPDATE_BLOCKS_ERROR;

  constructor(public payload: any) {
  }
}

export class ClearBlocks implements Action {
  readonly type = ListActionTypes.CLEAR_BLOCKS;
}

export type ListActions =
  FetchBlocks |
  FetchBlocksComplete |
  FetchBlocksError |
  UpdateBlocks |
  UpdateBlocksComplete |
  UpdateBlocksError |
  ClearBlocks;
