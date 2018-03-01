import { createFeatureSelector, createSelector, ActionReducerMap } from "@ngrx/store";

import * as fromRoot from "../../reducers";
import * as fromInstanceList from "./instance-list.reducer";

export interface InstanceListState {
  instances: fromInstanceList.State;
}

export interface State extends fromRoot.State {
  instanceList: InstanceListState;
}

export const reducers: ActionReducerMap<InstanceListState, any> = {
  instances: fromInstanceList.reducer,
};

// -----------------
// --- feature selector
export const getInstanceListState = createFeatureSelector<InstanceListState>("instanceList");

// -----------------
// ------- instances
export const getInstancesState = createSelector(getInstanceListState, state => state.instances);

export const getFetchedInstancesState = createSelector(getInstancesState, fromInstanceList.getFetchedInstancesState);
export const getFetchLoadingState = createSelector(getInstancesState, fromInstanceList.getFetchLoadingState);
export const getFetchErrorState = createSelector(getInstancesState, fromInstanceList.getFetchErrorState);
