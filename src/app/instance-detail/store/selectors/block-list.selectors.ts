import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { Block } from '../../../shared/models';

import { InstanceDetailState } from '../reducers';

import * as fromBlockList from '../reducers/block-list.reducer';

// -----------------
// --- feature selector
const getInstanceDetailState = createFeatureSelector<InstanceDetailState>('instanceDetail');

// -----------------
// ----- block list
const getBlockListState = createSelector(getInstanceDetailState, state => state.blockList);

export const getBlocks = createSelector(getBlockListState, fromBlockList.getBlocks);
export const isLoadingBlocks = createSelector(getBlockListState, fromBlockList.isLoadingBlocks);
export const getLoadingError = createSelector(getBlockListState, fromBlockList.getLoadingError);

export const getEditedBlockIds = createSelector(getBlockListState, fromBlockList.getIds);
export const getEditedBlockEntities = createSelector(getBlockListState, fromBlockList.getEntities);
export const getEditedBlocks = createSelector(getBlockListState, fromBlockList.getAll);
export const getTotalEditedBlock = createSelector(getBlockListState, fromBlockList.getTotal);

export const getBlockById = () => {
  return createSelector(
    getEditedBlockEntities,
    (entities: Dictionary<Block>, props: { id: string }) => {
      return entities[props.id];
    });
};

export const isSyncOngoing = createSelector(getBlockListState, fromBlockList.isSyncOngoing);
export const getSyncError = createSelector(getBlockListState, fromBlockList.getSyncError);

export const areAllBlocksValid = createSelector(getBlocks,
  (blocks: Block[] | undefined) => {
    return blocks ? blocks.every(block => block.valid === true) : false;
  });

export const isNextStepEnable = createSelector(
  areAllBlocksValid,
  isSyncOngoing,
  (blocksValidity: boolean, syncOngoing: boolean) => {
    return blocksValidity === true && syncOngoing === false;
  });
