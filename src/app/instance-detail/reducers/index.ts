import { InjectionToken } from "@angular/core";
import { createSelector, createFeatureSelector, combineReducers, ActionReducerMap } from "@ngrx/store";

import { CheckBoxBlock, DropdownBlock, TextInputBlock } from "../models";

import * as fromRoot from "../../reducers";
import * as fromInstanceDetailEffects from "./instance-detail-effects.reducer";
import * as fromList from "./list/list.reducer";
import * as fromSync from "./list/sync.reducer";
import * as fromEditedBlocks from "./list/blocks";
import * as fromCheckBox from "./list/blocks/check-box/check-box.reducer";
import * as fromDropdown from "./list/blocks/dropdown/dropdown.reducer";
import * as fromTextInput from "./list/blocks/text-input/text-input.reducer";

export interface InstanceDetailState {
  effects: fromInstanceDetailEffects.State;
  blockList: fromList.State;
  serverSync: fromSync.State;
  editedBlocks: fromEditedBlocks.State;
}

export interface State extends fromRoot.State {
  instanceDetail: InstanceDetailState;
}

// -----------------
// ------------ AOT
export const TOKEN = new InjectionToken<ActionReducerMap<InstanceDetailState>>("InstanceDetailReducers");

export function getReducers(): ActionReducerMap<InstanceDetailState, any> {
  return {
    effects: fromInstanceDetailEffects.reducer,
    blockList: fromList.reducer,
    serverSync: fromSync.reducer,
    editedBlocks: combineReducers(fromEditedBlocks.reducers),
  };
}

export const reducerProvider = [
  {provide: TOKEN, useFactory: getReducers}
];

// -----------------
// --- feature selector
export const getInstanceDetailState = createFeatureSelector<InstanceDetailState>("instanceDetail");

// -----------------
// ----- block list
export const getListState = createSelector(getInstanceDetailState, state => state.blockList);

export const getFetchedBlocksState = createSelector(getListState, fromList.getFetchedBlocksState);
export const getFetchLoadingState = createSelector(getListState, fromList.getFetchLoadingState);
export const getFetchErrorState = createSelector(getListState, fromList.getFetchErrorState);

export const getModuleForSyncBlocksState = createSelector(getListState, fromList.getModuleForSyncBlocksState);
export const getInstanceForSyncBlocksState = createSelector(getListState, fromList.getInstanceForSyncBlocksState);
export const getStepForSyncBlocksState = createSelector(getListState, fromList.getStepForSyncBlocksState);

export const getSyncingBlocksState = createSelector(getListState, fromList.getSyncingBlocksState);
export const getSyncingLoadingState = createSelector(getListState, fromList.getSyncingLoadingState);
export const getSyncErrorState = createSelector(getListState, fromList.getSyncErrorState);

// -----------------
// ----------- sync
export const getServerSyncState = createSelector(getInstanceDetailState, state => state.serverSync);

export const isSynchronizationRequiredState = createSelector(getServerSyncState, fromSync.isSynchronizationRequiredState);
export const isSynchronizationRequiredWithTimestampState = createSelector(getServerSyncState, fromSync.isSynchronizationRequiredWithTimestampState);

// -----------------
// ----- edited blocks
export const getEditedBlocksState = createSelector(getInstanceDetailState, state => state.editedBlocks);

// ------- check-box
export const getCheckBoxState = createSelector(getEditedBlocksState, fromEditedBlocks.getCheckBoxState);

export const getCheckBoxIds = createSelector(getCheckBoxState, fromCheckBox.getCheckBoxIds);
export const getCheckBoxEntities = createSelector(getCheckBoxState, fromCheckBox.getCheckBoxEntities);
export const getAllCheckBox = createSelector(getCheckBoxState, fromCheckBox.getAllCheckBox);
export const getTotalCheckBox = createSelector(getCheckBoxState, fromCheckBox.getTotalCheckBox);
export const getCheckBoxBlocksValidityState = createSelector(getCheckBoxState, fromCheckBox.getCheckBoxBlocksValidityState);
export const getCheckBoxBlocksLoadingState = createSelector(getCheckBoxState, fromCheckBox.getCheckBoxBlocksLoadingState);

// -------- dropdown
export const getDropdownState = createSelector(getEditedBlocksState, fromEditedBlocks.getDropdownState);

export const getDropdownIds = createSelector(getDropdownState, fromDropdown.getDropdownIds);
export const getDropdownEntities = createSelector(getDropdownState, fromDropdown.getDropdownEntities);
export const getAllDropdown = createSelector(getDropdownState, fromDropdown.getAllDropdown);
export const getTotalDropdown = createSelector(getDropdownState, fromDropdown.getTotalDropdown);
export const getDropdownBlocksValidityState = createSelector(getDropdownState, fromDropdown.getDropdownBlocksValidityState);
export const getDropdownBlocksLoadingState = createSelector(getDropdownState, fromDropdown.getDropdownBlocksLoadingState);

// ------ text-input
export const getTextInputState = createSelector(getEditedBlocksState, fromEditedBlocks.getTextInputState);

export const getTextInputIds = createSelector(getTextInputState, fromTextInput.getTextInputIds);
export const getTextInputEntities = createSelector(getTextInputState, fromTextInput.getTextInputEntities);
export const getAllTextInput = createSelector(getTextInputState, fromTextInput.getAllTextInput);
export const getTotalTextInput = createSelector(getTextInputState, fromTextInput.getTotalTextInput);
export const getTextInputBlocksValidityState = createSelector(getTextInputState, fromTextInput.getTextInputBlocksValidityState);
export const getTextInputBlocksLoadingState = createSelector(getTextInputState, fromTextInput.getTextInputBlocksLoadingState);

// -----------------
// --------- generic
export const getAllEditedBlocksState = createSelector(
  getAllCheckBox,
  getAllDropdown,
  getAllTextInput,
  (checkBoxBlocks: CheckBoxBlock[], dropdownBlocks: DropdownBlock[], textInputBlocks: TextInputBlock[]) => {
    return [
      ...checkBoxBlocks,
      ...dropdownBlocks,
      ...textInputBlocks,
    ];
  },
);

export const getSyncBlocksInstanceState = createSelector(
  getModuleForSyncBlocksState,
  getInstanceForSyncBlocksState,
  getStepForSyncBlocksState,
  (module: string | undefined, instance: string | undefined, step: string | undefined) => {
    return {
      module: module,
      instance: instance,
      step: step,
    };
  },
);

export const getAllEditedBlocksValidityState = createSelector(
  isSynchronizationRequiredState,
  getCheckBoxBlocksValidityState,
  getDropdownBlocksValidityState,
  getTextInputBlocksValidityState,
  (syncRequired: boolean, checkBoxValidity: boolean, dropdownValidity: boolean, textInputValidity: boolean) => {
    return !syncRequired && checkBoxValidity && dropdownValidity && textInputValidity;
  }
);
