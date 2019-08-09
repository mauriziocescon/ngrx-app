import { BlockListActionTypes, BlockListActions } from '../actions/block-list.actions';

import { Block } from '../../../shared/shared.module';

export interface State {
  fetchedBlocks: Block[] | undefined;
  fetchLoading: boolean;
  fetchError: string | undefined;

  syncingBlocks: Block[] | undefined;
  syncLoading: boolean;
  syncError: string | undefined;
}

const initialState: State = {
  fetchedBlocks: [],
  fetchLoading: false,
  fetchError: undefined,

  syncingBlocks: undefined,
  syncLoading: false,
  syncError: undefined,
};

export function reducer(state = initialState, action: BlockListActions): State {
  switch (action.type) {
    case BlockListActionTypes.LOAD_BLOCKS: {
      return {
        ...state,
        fetchedBlocks: undefined,
        fetchLoading: true,
        fetchError: undefined,
      };
    }
    case BlockListActionTypes.LOAD_BLOCKS_SUCCESS: {
      return {
        ...state,
        fetchedBlocks: action.payload.blocks.map(block => block),
        fetchLoading: false,
        fetchError: undefined,
      };
    }
    case BlockListActionTypes.LOAD_BLOCKS_FAILURE: {
      return {
        ...state,
        fetchedBlocks: undefined,
        fetchLoading: false,
        fetchError: action.payload.error,
      };
    }
    case BlockListActionTypes.SYNC_BLOCKS: {
      return {
        ...state,
        syncingBlocks: action.payload.blocks.map(block => block),
        syncLoading: true,
        syncError: undefined,
      };
    }
    case BlockListActionTypes.SYNC_BLOCKS_SUCCESS: {
      return {
        ...state,
        syncingBlocks: undefined,
        syncLoading: false,
        syncError: undefined,
      };
    }
    case BlockListActionTypes.SYNC_BLOCKS_FAILURE: {
      return {
        ...state,
        syncingBlocks: undefined,
        syncLoading: false,
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

export const getFetchedBlocks = (state: State) => state.fetchedBlocks;
export const getFetchLoading = (state: State) => state.fetchLoading;
export const getFetchError = (state: State) => state.fetchError;

export const getSyncingBlocks = (state: State) => state.syncingBlocks;
export const getSyncLoading = (state: State) => state.syncLoading;
export const getSyncError = (state: State) => state.syncError;
