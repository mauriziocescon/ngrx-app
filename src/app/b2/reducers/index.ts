import { InjectionToken } from "@angular/core";
import { createSelector, createFeatureSelector, combineReducers, ActionReducerMap } from "@ngrx/store";

import { DatePickerBlock } from "../models";

import * as fromRoot from "../../reducers";
import { fromInstanceDetail, Block } from "../../instance-detail/instance-detail.module";
import * as fromEditedBlocks from "./blocks";
import * as fromDatePicker from "./blocks/date-picker/date-picker.reducer";

export interface B2BlocksState {
  editedBlocks: fromEditedBlocks.State;
}

export interface State extends fromRoot.State {
  b2Blocks: B2BlocksState;
}

// -----------------
// ------------ AOT
export const TOKEN = new InjectionToken<ActionReducerMap<fromEditedBlocks.State>>("B2EditedBlocksReducers");

export const getReducers = () => {
  return {
    editedBlocks: combineReducers(fromEditedBlocks.reducers),
  };
};

export const reducerProvider = [
  {provide: TOKEN, useFactory: getReducers}
];

// -----------------
// --- feature selector
export const getB2BlocksState = createFeatureSelector<B2BlocksState>("b2Blocks");

// -----------------
// ----- edit blocks
export const getEditedBlocksState = createSelector(getB2BlocksState, state => state.editedBlocks);

// -----------------
// ------ date-picker
export const getDatePickerState = createSelector(getEditedBlocksState, fromEditedBlocks.getDatePickerState);

export const getDatePickerIds = createSelector(getDatePickerState, fromDatePicker.getDatePickerIds);
export const getDatePickerEntities = createSelector(getDatePickerState, fromDatePicker.getDatePickerEntities);
export const getAllDatePicker = createSelector(getDatePickerState, fromDatePicker.getAllDatePicker);
export const getTotalDatePicker = createSelector(getDatePickerState, fromDatePicker.getTotalDatePicker);
export const getDatePickerBlocksValidityState = createSelector(getDatePickerState, fromDatePicker.getDatePickerBlocksValidityState);
export const getDatePickerBlocksLoadingState = createSelector(getDatePickerState, fromDatePicker.getDatePickerBlocksLoadingState);

// -----------------
// --------- generic
export const getAllEditedBlocksState = createSelector(
  fromInstanceDetail.getAllEditedBlocksState,
  getAllDatePicker,
  (blocks: Block[], datePickerBlocks: DatePickerBlock[]) => {
    return [
      ...blocks,
      ...datePickerBlocks,
    ];
  },
);

export const getAllEditedBlocksValidityState = createSelector(
  fromInstanceDetail.getAllEditedBlocksValidityState,
  getDatePickerBlocksValidityState,
  (validity: boolean, datePickerValidity: boolean) => {
    return validity && datePickerValidity;
  }
);