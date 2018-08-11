import { ListActionTypes, ListActions } from '../../actions/list/list.actions';

import { Block } from '../../../shared/shared.module';

export interface State {
  fetchedBlocks: Block[] | undefined;
  fetchLoading: boolean;
  fetchError: string | undefined;

  syncBlocksForInstance: string | undefined;
  syncingBlocks: Block[] | undefined;
  syncingLoading: boolean;
  syncError: string | undefined;
}

const initialState: State = {
  fetchedBlocks: [],
  fetchLoading: false,
  fetchError: undefined,

  syncBlocksForInstance: undefined,
  syncingBlocks: undefined,
  syncingLoading: false,
  syncError: undefined,
};

export function reducer(state = initialState, action: ListActions): State {
  switch (action.type) {
    case ListActionTypes.FETCH_BLOCKS: {
      return {
        ...state,
        fetchedBlocks: undefined,
        fetchLoading: true,
        fetchError: undefined,
      };
    }
    case ListActionTypes.FETCH_BLOCKS_COMPLETE: {
      return {
        ...state,
        fetchedBlocks: action.payload.map(blocks => blocks),
        fetchLoading: false,
        fetchError: undefined,
      };
    }
    case ListActionTypes.FETCH_BLOCKS_ERROR: {
      return {
        ...state,
        fetchedBlocks: undefined,
        fetchLoading: false,
        fetchError: action.payload,
      };
    }
    case ListActionTypes.SYNC_BLOCKS: {
      return {
        ...state,
        syncBlocksForInstance: action.payload.instance,
        syncingBlocks: action.payload.blocks.map(blocks => blocks),
        syncingLoading: true,
        syncError: undefined,
      };
    }
    case ListActionTypes.SYNC_BLOCKS_COMPLETE: {
      return {
        ...state,
        syncBlocksForInstance: undefined,
        syncingBlocks: undefined,
        syncingLoading: false,
        syncError: undefined,
      };
    }
    case ListActionTypes.SYNC_BLOCKS_ERROR: {
      return {
        ...state,
        syncingBlocks: undefined,
        syncingLoading: false,
        syncError: action.payload,
      };
    }
    case ListActionTypes.CLEAR_BLOCKS: {
      return {
        ...state,
        fetchedBlocks: [],
        fetchLoading: false,
        fetchError: undefined,
      };
    }
    default: {
      return state;
    }
  }
}

export const getFetchedBlocks = (state: State) => state.fetchedBlocks;
export const getFetchLoading = (state: State) => state.fetchLoading;
export const getFetchError = (state: State) => state.fetchError;

export const getInstanceForSyncBlocks = (state: State) => state.syncBlocksForInstance;
export const getSyncingBlocks = (state: State) => state.syncingBlocks;
export const getSyncingLoading = (state: State) => state.syncingLoading;
export const getSyncError = (state: State) => state.syncError;
