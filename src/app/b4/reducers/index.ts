import { InjectionToken } from "@angular/core";
import { createSelector, createFeatureSelector, combineReducers, ActionReducerMap } from "@ngrx/store";

import { DossierBlock } from "../models";

import * as fromRoot from "../../reducers";
import { fromInstanceDetail, Block } from "../../instance-detail/instance-detail.module";
import * as fromB4Effects from "./b4-effects.reducer";
import * as fromEditedBlocks from "./blocks";
import * as fromDossier from "./blocks/dossier/dossier.reducer";

export interface B4BlocksState {
  effects: fromB4Effects.State;
  editedBlocks: fromEditedBlocks.State;
}

export interface State extends fromRoot.State {
  b4Blocks: B4BlocksState;
}

// -----------------
// ------------ AOT
export const TOKEN = new InjectionToken<ActionReducerMap<fromEditedBlocks.State>>("B4EditedBlocksReducers");

export function getReducers(): ActionReducerMap<B4BlocksState> {
  return {
    effects: fromB4Effects.reducer,
    editedBlocks: combineReducers(fromEditedBlocks.reducers),
  };
}

export const reducerProvider = [
  {provide: TOKEN, useFactory: getReducers}
];

// -----------------
// --- feature selector
export const getB4BlocksState = createFeatureSelector<B4BlocksState>("b4Blocks");

// -----------------
// ----- edited blocks
export const getEditedBlocksState = createSelector(getB4BlocksState, state => state.editedBlocks);

// -----------------
// ------ dossier
export const getDossierState = createSelector(getEditedBlocksState, fromEditedBlocks.getDossierState);

export const getDossierIds = createSelector(getDossierState, fromDossier.getDossierIds);
export const getDossierEntities = createSelector(getDossierState, fromDossier.getDossierEntities);
export const getAllDossier = createSelector(getDossierState, fromDossier.getAllDossier);
export const getTotalDossier = createSelector(getDossierState, fromDossier.getTotalDossier);
export const getDossierBlocksValidityState = createSelector(getDossierState, fromDossier.getDossierBlocksValidityState);
export const getDossierBlocksLoadingState = createSelector(getDossierState, fromDossier.getDossierBlocksLoadingState);

// -----------------
// --------- generic
export const getAllEditedBlocksState = createSelector(
  fromInstanceDetail.getAllEditedBlocksState,
  getAllDossier,
  (blocks: Block[], dossierBlocks: DossierBlock[]) => {
    return [
      ...blocks,
      ...dossierBlocks,
    ];
  },
);

export const getAllEditedBlocksValidityState = createSelector(
  fromInstanceDetail.getAllEditedBlocksValidityState,
  getDossierBlocksValidityState,
  (validity: boolean, dossierValidity: boolean) => {
    return validity && dossierValidity;
  }
);
