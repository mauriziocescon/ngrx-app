import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BlocksState } from '../reducers';

import * as fromBlockList from '../reducers/block-list.reducer';

// -----------------
// --- feature selector
export const getBlocksState = createFeatureSelector<BlocksState>('blocks');

// -----------------
// ----- block list
export const getBlockListState = createSelector(getBlocksState, state => state.blockList);

export const getFetchedBlocks = createSelector(getBlockListState, fromBlockList.getFetchedBlocks);
export const getFetchLoading = createSelector(getBlockListState, fromBlockList.getFetchLoading);
export const getFetchError = createSelector(getBlockListState, fromBlockList.getFetchError);

export const getSyncingBlocks = createSelector(getBlockListState, fromBlockList.getSyncingBlocks);
export const getSyncLoading = createSelector(getBlockListState, fromBlockList.getSyncLoading);
export const getSyncError = createSelector(getBlockListState, fromBlockList.getSyncError);
