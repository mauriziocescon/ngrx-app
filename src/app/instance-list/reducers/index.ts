import { createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromRoot from "../../reducers";
import * as fromHome from "./home.reducer";

export interface HomeState {
  instances: fromHome.State;
}

export interface State extends fromRoot.State {
  home: HomeState;
}

export const reducers = {
  instances: fromHome.reducer,
};

// -----------------
// --- feature selector
export const getHomeState = createFeatureSelector<HomeState>("home");

// -----------------
// ------- instances
export const getInstancesState = createSelector(getHomeState, state => state.instances);

export const getFetchedInstancesState = createSelector(getInstancesState, fromHome.getFetchedInstancesState);
export const getFetchLoadingState = createSelector(getInstancesState, fromHome.getFetchLoadingState);
export const getFetchErrorState = createSelector(getInstancesState, fromHome.getFetchErrorState);
