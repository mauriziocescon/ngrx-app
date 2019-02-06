import { Action } from '@ngrx/store';

import { Block } from '../../shared/shared.module';

export enum BlockListActionTypes {
  FETCH_BLOCKS = '[BlockList] Fetch blocks',
  FETCH_BLOCKS_SUCCESS = '[BlockList] Fetch blocks success',
  FETCH_BLOCKS_FAILURE = '[BlockList] Fetch blocks failure',

  SYNC_BLOCKS = '[BlockList] Sync blocks',
  SYNC_BLOCKS_SUCCESS = '[BlockList] Sync blocks success',
  SYNC_BLOCKS_FAILURE = '[BlockList] Sync blocks failure',

  CLEAR_BLOCKS = '[BlockList] Clear blocks',
}

export class FetchBlocks implements Action {
  readonly type = BlockListActionTypes.FETCH_BLOCKS;

  constructor(public payload: { instance: string }) {
  }
}

export class FetchBlocksSuccess implements Action {
  readonly type = BlockListActionTypes.FETCH_BLOCKS_SUCCESS;

  constructor(public payload: { blocks: Block[] }) {
  }
}

export class FetchBlocksFailure implements Action {
  readonly type = BlockListActionTypes.FETCH_BLOCKS_FAILURE;

  constructor(public payload: { error: string }) {
  }
}

export class SyncBlocks implements Action {
  readonly type = BlockListActionTypes.SYNC_BLOCKS;

  constructor(public payload: { instance: string, blocks: Block[] }) {
  }
}

export class SyncBlocksSuccess implements Action {
  readonly type = BlockListActionTypes.SYNC_BLOCKS_SUCCESS;
}

export class SyncBlocksFailure implements Action {
  readonly type = BlockListActionTypes.SYNC_BLOCKS_FAILURE;

  constructor(public payload: { error: string }) {
  }
}

export class ClearBlocks implements Action {
  readonly type = BlockListActionTypes.CLEAR_BLOCKS;
}

export type BlockListActions =
  FetchBlocks |
  FetchBlocksSuccess |
  FetchBlocksFailure |
  SyncBlocks |
  SyncBlocksSuccess |
  SyncBlocksFailure |
  ClearBlocks;
