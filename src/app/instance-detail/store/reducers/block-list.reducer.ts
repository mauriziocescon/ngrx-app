import { createSelector } from '@ngrx/store';
import { createEntityAdapter, Dictionary, EntityAdapter, EntityState } from '@ngrx/entity';

import { BlockListActionTypes, BlockListActions } from '../actions/block-list.actions';

import { Block } from '../../../shared';

export interface State extends EntityState<Block> {
  fetchedBlocks: Block[] | undefined;
  fetchOngoing: boolean;
  fetchError: string | undefined;

  syncOngoing: boolean;
  syncError: string | undefined;
}

export const adapter: EntityAdapter<Block> = createEntityAdapter<Block>({
  selectId: (block: Block) => block.id,
});

export const initialState: State = adapter.getInitialState({
  fetchedBlocks: undefined,
  fetchOngoing: false,
  fetchError: undefined,

  editedBlocks: undefined,

  syncOngoing: false,
  syncError: undefined,
});

export function reducer(state = initialState, action: BlockListActions): State {
  switch (action.type) {
    case BlockListActionTypes.LOAD_BLOCKS: {
      return adapter.removeAll({
        ...state,
        fetchedBlocks: undefined,
        fetchOngoing: true,
        fetchError: undefined,
      });
    }
    case BlockListActionTypes.LOAD_BLOCKS_SUCCESS: {
      return adapter.upsertMany(action.payload.blocks, {
        ...state,
        fetchedBlocks: action.payload.blocks.map(block => block),
        fetchOngoing: false,
        fetchError: undefined,
      });
    }
    case BlockListActionTypes.LOAD_BLOCKS_FAILURE: {
      return {
        ...state,
        fetchedBlocks: undefined,
        fetchOngoing: false,
        fetchError: action.payload.error,
      };
    }
    case BlockListActionTypes.UPDATE_BLOCK: {
      return adapter.updateOne(action.payload.block, state);
    }
    case BlockListActionTypes.SYNC_BLOCKS: {
      return {
        ...state,
        syncOngoing: true,
        syncError: undefined,
      };
    }
    case BlockListActionTypes.SYNC_BLOCKS_SUCCESS: {
      return {
        ...state,
        syncOngoing: false,
        syncError: undefined,
      };
    }
    case BlockListActionTypes.SYNC_BLOCKS_FAILURE: {
      return {
        ...state,
        syncOngoing: false,
        syncError: action.payload.error,
      };
    }
    case BlockListActionTypes.CLEAR_BLOCKS: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export const {
  selectIds: getIds,
  selectEntities: getEntities,
  selectAll: getAll,
  selectTotal: getTotal,
} = adapter.getSelectors();

export const getBlocks = (state: State) => state.fetchedBlocks;
export const isLoadingBlocks = (state: State) => state.fetchOngoing;
export const getLoadingError = (state: State) => state.fetchError;

export const isSyncOngoing = (state: State) => state.syncOngoing;
export const getSyncError = (state: State) => state.syncError;
