import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { Block } from '../../shared';

import { actionGroup } from './instance-detail.actions';

const adapter = createEntityAdapter<Block>({
  selectId: (block: Block) => block.id,
});

interface State {
  fetchedBlocks: Block[] | undefined;
  fetchOngoing: boolean;
  fetchError: string | undefined;

  blocks: EntityState<Block>;

  syncOngoing: boolean;
  syncError: string | undefined;
  syncRequired: boolean;
  timestamp: number | undefined;
}

const initialState: State = {
  fetchedBlocks: undefined,
  fetchOngoing: false,
  fetchError: undefined,

  blocks: adapter.getInitialState(),

  syncOngoing: false,
  syncError: undefined,
  syncRequired: false,
  timestamp: undefined,
};

export const feature = createFeature({
  name: `detail`,
  reducer: createReducer(
    initialState,
    on(actionGroup.loadBlocks, (state, action) => ({
      ...state,
      fetchedBlocks: undefined,
      fetchOngoing: true,
      fetchError: undefined,
    })),
    on(actionGroup.loadBlocksSuccess, (state, action) => ({
      ...state,
      fetchedBlocks: action.blocks,
      fetchOngoing: false,
      fetchError: undefined,
      blocks: adapter.upsertMany(action.blocks, state.blocks),
    })),
    on(actionGroup.loadBlocksFailure, (state, action) => ({
      ...state,
      fetchedBlocks: undefined,
      fetchOngoing: false,
      fetchError: action.error,
    })),

    on(actionGroup.updateBlock, (state, action) => ({
      ...state,
      blocks: adapter.updateOne(action.block, state.blocks),
    })),

    on(actionGroup.syncBlocks, (state, action) => ({
      ...state,
      syncOngoing: true,
      syncError: undefined,
    })),
    on(actionGroup.syncBlocksSuccess, (state, action) => ({
      ...state,
      syncOngoing: false,
      syncError: undefined,
    })),
    on(actionGroup.syncBlocksFailure, (state, action) => ({
      ...state,
      syncOngoing: false,
      syncError: action.error,
    })),
    on(actionGroup.syncRequired, (state, action) => ({
      ...state,
      syncRequired: true,
      timestamp: action.timestamp,
    })),
    on(actionGroup.synchronized, (state, action) => ({
      ...state,
      syncRequired: false,
      timestamp: undefined,
    })),
    on(actionGroup.clearBlocks, (state, action) => ({
      ...initialState,
    })),
  ),
  extraSelectors: ({
                     selectFetchedBlocks,
                     selectFetchOngoing,
                     selectFetchError,
                     selectBlocks,
                     selectSyncOngoing,
                     selectSyncError,
                     selectSyncRequired,
                     selectTimestamp,
                   }) => {
    const getEditedBlockEntities = createSelector(
      selectBlocks,
      adapter.getSelectors().selectEntities,
    );
    const getEditedBlocks = createSelector(
      selectBlocks,
      adapter.getSelectors().selectAll,
    );
    const getBlockById = id => createSelector(
      getEditedBlockEntities,
      entities => entities[id],
    );
    const areAllBlocksValid = createSelector(
      selectFetchedBlocks,
      blocks => blocks?.every(block => block.valid === true) ?? false,
    );
    const isNextStepEnable = createSelector(
      areAllBlocksValid,
      selectSyncOngoing,
      (blocksValidity, syncOngoing) => blocksValidity === true && syncOngoing === false,
    );
    const isSyncRequiredWithTimestamp = createSelector({
      syncRequired: selectSyncRequired,
      timestamp: selectTimestamp,
    });

    return {
      getBlocks: selectFetchedBlocks,
      isLoadingBlocks: selectFetchOngoing,
      getLoadingError: selectFetchError,
      getEditedBlockEntities,
      getEditedBlocks,
      getBlockById,
      isSyncOngoing: selectSyncOngoing,
      getSyncError: selectSyncError,
      areAllBlocksValid,
      isNextStepEnable,
      isSyncRequired: selectSyncRequired,
      isSyncRequiredWithTimestamp,
    };
  },
});
