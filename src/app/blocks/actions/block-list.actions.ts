import { Action } from '@ngrx/store';

import { Block } from '../../shared/shared.module';

export enum BlockListActionTypes {
  FETCH_BLOCKS = '[BlockList] Fetch blocks',
  FETCH_BLOCKS_COMPLETE = '[BlockList] Fetch blocks complete',
  FETCH_BLOCKS_ERROR = '[BlockList] Fetch blocks error',

  SYNC_BLOCKS = '[BlockList] Sync blocks',
  SYNC_BLOCKS_COMPLETE = '[BlockList] Sync blocks complete',
  SYNC_BLOCKS_ERROR = '[BlockList] Sync blocks error',

  CLEAR_BLOCKS = '[BlockList] Clear blocks',
}

export class FetchBlocks implements Action {
  readonly type = BlockListActionTypes.FETCH_BLOCKS;

  constructor(public payload: { instance: string }) {
  }
}

export class FetchBlocksComplete implements Action {
  readonly type = BlockListActionTypes.FETCH_BLOCKS_COMPLETE;

  constructor(public payload: { blocks: Block[] }) {
  }
}

export class FetchBlocksError implements Action {
  readonly type = BlockListActionTypes.FETCH_BLOCKS_ERROR;

  constructor(public payload: { error: string }) {
  }
}

export class SyncBlocks implements Action {
  readonly type = BlockListActionTypes.SYNC_BLOCKS;

  constructor(public payload: { instance: string, blocks: Block[] }) {
  }
}

export class SyncBlocksComplete implements Action {
  readonly type = BlockListActionTypes.SYNC_BLOCKS_COMPLETE;
}

export class SyncBlocksError implements Action {
  readonly type = BlockListActionTypes.SYNC_BLOCKS_ERROR;

  constructor(public payload: { error: string }) {
  }
}

export class ClearBlocks implements Action {
  readonly type = BlockListActionTypes.CLEAR_BLOCKS;
}

export type BlockListActions =
  FetchBlocks |
  FetchBlocksComplete |
  FetchBlocksError |
  SyncBlocks |
  SyncBlocksComplete |
  SyncBlocksError |
  ClearBlocks;
