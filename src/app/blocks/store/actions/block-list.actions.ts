import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Block } from '../../../shared/shared.module';

export enum BlockListActionTypes {
  LOAD_BLOCKS = '[BlockList] Load blocks',
  LOAD_BLOCKS_SUCCESS = '[BlockList] Load blocks success',
  LOAD_BLOCKS_FAILURE = '[BlockList] Load blocks failure',

  UPDATE_BLOCK = '[BlockList] Update block',

  SYNC_BLOCKS = '[BlockList] Sync blocks',
  SYNC_BLOCKS_SUCCESS = '[BlockList] Sync blocks success',
  SYNC_BLOCKS_FAILURE = '[BlockList] Sync blocks failure',

  CLEAR_BLOCKS = '[BlockList] Clear blocks',
}

export class LoadBlocks implements Action {
  readonly type = BlockListActionTypes.LOAD_BLOCKS;

  constructor(public payload: { instanceId: string }) {
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

export class UpdateBlock implements Action {
  readonly type = BlockListActionTypes.UPDATE_BLOCK;

  constructor(public payload: { block: Update<Block> }) {
  }
}

export class SyncBlocks implements Action {
  readonly type = BlockListActionTypes.SYNC_BLOCKS;

  constructor(public payload: { instanceId: string, blocks: Block[] }) {
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
  UpdateBlock |
  SyncBlocks |
  SyncBlocksSuccess |
  SyncBlocksFailure |
  ClearBlocks;
