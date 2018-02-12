import { InjectionToken } from "@angular/core";
import { createSelector, createFeatureSelector, combineReducers, ActionReducerMap } from "@ngrx/store";

import { DatePickerBlock } from "../models";

import * as fromRoot from "../../../reducers";
import { fromDynamicBlockList, Block } from "../../../dynamic-block-list/dynamic-block-list.module";
import * as fromEditBlocks from "./blocks";
import * as fromDatePicker from "./blocks/date-picker/date-picker.reducer";

export interface B2BlocksState {
  editBlocks: fromEditBlocks.State;
}

export interface State extends fromRoot.State {
  b2Blocks: B2BlocksState;
}

// -----------------
// ------------ AOT
export const TOKEN = new InjectionToken<ActionReducerMap<fromEditBlocks.State>>("B2BlocksEditBlocksReducers");

export const getReducers = () => {
  return {
    editBlocks: combineReducers(fromEditBlocks.reducers),
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
export const getEditBlocksState = createSelector(getB2BlocksState, state => state.editBlocks);

// -----------------
// ------ date-picker
export const getDatePickerState = createSelector(getEditBlocksState, fromEditBlocks.getDatePickerState);

export const getDatePickerIds = createSelector(getDatePickerState, fromDatePicker.getDatePickerIds);
export const getDatePickerEntities = createSelector(getDatePickerState, fromDatePicker.getDatePickerEntities);
export const getAllDatePicker = createSelector(getDatePickerState, fromDatePicker.getAllDatePicker);
export const getTotalDatePicker = createSelector(getDatePickerState, fromDatePicker.getTotalDatePicker);
export const getDatePickerBlocksValidityState = createSelector(getDatePickerState, fromDatePicker.getDatePickerBlocksValidityState);
export const getDatePickerBlocksLoadingState = createSelector(getDatePickerState, fromDatePicker.getDatePickerBlocksLoadingState);

// -----------------
// --------- generic
export const getAllEditBlocksState = createSelector(
  fromDynamicBlockList.getAllEditBlocksState,
  getAllDatePicker,
  (blocks: Block[], datePickerBlocks: DatePickerBlock[]) => {
    return [
      ...blocks,
      ...datePickerBlocks,
    ];
  },
);

export const getAllEditBlocksValidityState = createSelector(
  fromDynamicBlockList.getAllEditBlocksValidityState,
  getDatePickerBlocksValidityState,
  (validity: boolean, datePickerValidity: boolean) => {
    return validity && datePickerValidity;
  }
);
