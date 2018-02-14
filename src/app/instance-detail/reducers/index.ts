import { createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromRoot from "../../reducers";
import * as fromInstanceDetail from "./instance-detail.reducer";

export interface InstanceDetailState {
  xxx: fromInstanceDetail.State;
}

export interface State extends fromRoot.State {
  instanceDetail: InstanceDetailState;
}

export const reducers = {
  xxx: fromInstanceDetail.reducer,
};

// -----------------
// --- feature selector
export const getInstanceDetailState = createFeatureSelector<InstanceDetailState>("instanceDetail");

// -----------------
// ---- instance detail
export const getXXXState = createSelector(getInstanceDetailState, state => state.xxx);
