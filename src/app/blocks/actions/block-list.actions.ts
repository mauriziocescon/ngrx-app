import { Action } from '@ngrx/store';

import { Block } from '../../shared/shared.module';

export enum BlockListActionTypes {
  LOAD_BLOCKS = '[BlockList] Load blocks',
  LOAD_BLOCKS_SUCCESS = '[BlockList] Load blocks success',
  LOAD_BLOCKS_FAILURE = '[BlockList] Load blocks failure',

  SYNC_BLOCKS = '[BlockList] Sync blocks',
  SYNC_BLOCKS_SUCCESS = '[BlockList] Sync blocks success',
  SYNC_BLOCKS_FAILURE = '[BlockList] Sync blocks failure',

  CLEAR_BLOCKS = '[BlockList] Clear blocks',
}

export class LoadBlocks implements Action {
  readonly type = BlockListActionTypes.LOAD_BLOCKS;

  constructor(public payload: { instance: string }) {
  }
}

export class LoadBlocksSuccess implements Action {
  readonly type = BlockListActionTypes.LOAD_BLOCKS_SUCCESS;

  constructor(public payload: { blocks: Block[] }) {
  }
}

export class LoadBlocksFailure implements Action {
  readonly type = BlockListActionTypes.LOAD_BLOCKS_FAILURE;

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
  LoadBlocks |
  LoadBlocksSuccess |
  LoadBlocksFailure |
  SyncBlocks |
  SyncBlocksSuccess |
  SyncBlocksFailure |
  ClearBlocks;
