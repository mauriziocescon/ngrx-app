import { ListActionTypes, ListActions } from '../../actions/list/list.actions';

import { Block } from '../../../shared/shared.module';

export interface State {
  fetchedBlocks: Block[] | undefined;
  fetchLoading: boolean;
  fetchError: string | undefined;

  syncBlocksForModule: string | undefined;
  syncBlocksForInstance: string | undefined;
  syncBlocksForStep: string | undefined;
  syncingBlocks: Block[] | undefined;
  syncingLoading: boolean;
  syncError: string | undefined;
}

const initialState: State = {
  fetchedBlocks: [],
  fetchLoading: false,
  fetchError: undefined,

  syncBlocksForModule: undefined,
  syncBlocksForInstance: undefined,
  syncBlocksForStep: undefined,
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
        syncBlocksForModule: action.payload.module,
        syncBlocksForInstance: action.payload.instance,
        syncBlocksForStep: action.payload.step,
        syncingBlocks: action.payload.blocks.map(blocks => blocks),
        syncingLoading: true,
        syncError: undefined,
      };
    }
    case ListActionTypes.SYNC_BLOCKS_COMPLETE: {
      return {
        ...state,
        syncBlocksForModule: undefined,
        syncBlocksForInstance: undefined,
        syncBlocksForStep: undefined,
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
      };
    }
    default: {
      return state;
    }
  }
}

export const getFetchedBlocksState = (state: State) => state.fetchedBlocks;
export const getFetchLoadingState = (state: State) => state.fetchLoading;
export const getFetchErrorState = (state: State) => state.fetchError;

export const getModuleForSyncBlocksState = (state: State) => state.syncBlocksForModule;
export const getInstanceForSyncBlocksState = (state: State) => state.syncBlocksForInstance;
export const getStepForSyncBlocksState = (state: State) => state.syncBlocksForStep;
export const getSyncingBlocksState = (state: State) => state.syncingBlocks;
export const getSyncingLoadingState = (state: State) => state.syncingLoading;
export const getSyncErrorState = (state: State) => state.syncError;
