import { ListActionTypes, ListActions } from "../../actions/list/list.actions";
import { Block } from "../../models";

export interface State {
  fetchedBlocks: Block[];
  fetchLoading: boolean;
  fetchError: string | undefined;

  updateBlocksForModule: string;
  updateBlocksForInstance: string;
  updateBlocksForStep: string;
  updateBlocks: Block[];
  updateLoading: boolean;
  updateError: string | undefined;
}

const initialState: State = {
  fetchedBlocks: [],
  fetchLoading: false,
  fetchError: undefined,

  updateBlocksForModule: undefined,
  updateBlocksForInstance: undefined,
  updateBlocksForStep: undefined,
  updateBlocks: undefined,
  updateLoading: false,
  updateError: undefined,
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
    case ListActionTypes.UPDATE_BLOCKS: {
      return {
        ...state,
        updateBlocksForModule: action.payload.module,
        updateBlocksForInstance: action.payload.instance,
        updateBlocksForStep: action.payload.step,
        updateBlocks: action.payload.blocks.map(blocks => blocks),
        updateLoading: true,
        updateError: undefined,
      };
    }
    case ListActionTypes.UPDATE_BLOCKS_COMPLETE: {
      return {
        ...state,
        updateBlocksForModule: undefined,
        updateBlocksForInstance: undefined,
        updateBlocksForStep: undefined,
        updateBlocks: undefined,
        updateLoading: false,
        updateError: undefined,
      };
    }
    case ListActionTypes.UPDATE_BLOCKS_ERROR: {
      return {
        ...state,
        updateBlocks: undefined,
        updateLoading: false,
        updateError: action.payload,
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

export const getUpdateBlocksForModuleState = (state: State) => state.updateBlocksForModule;
export const getUpdateBlocksForInstanceState = (state: State) => state.updateBlocksForInstance;
export const getUpdateBlocksForStepState = (state: State) => state.updateBlocksForStep;
export const getUpdateBlocksState = (state: State) => state.updateBlocks;
export const getUpdateLoadingState = (state: State) => state.updateLoading;
export const getUpdateErrorState = (state: State) => state.updateError;
