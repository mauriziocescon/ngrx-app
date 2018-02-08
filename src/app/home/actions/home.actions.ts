import { Action } from "@ngrx/store";

import { Instance } from "../models";

export enum HomeActionTypes {
  FETCH_INSTANCES = "[Home] Fetch instances",
  FETCH_INSTANCES_COMPLETE = "[Home] Fetch instances complete",
  FETCH_INSTANCES_ERROR = "[Home] Fetch instances error",
}

export class FetchInstances implements Action {
  readonly type = HomeActionTypes.FETCH_INSTANCES;

  constructor(public payload: { module: string, instance: string, step: string }) {
  }
}

export class FetchInstancesComplete implements Action {
  readonly type = HomeActionTypes.FETCH_INSTANCES_COMPLETE;

  constructor(public payload: Instance[]) {
  }
}

export class FetchInstancesError implements Action {
  readonly type = HomeActionTypes.FETCH_INSTANCES_ERROR;

  constructor(public payload: any) {
  }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type HomeActions =
  FetchInstances |
  FetchInstancesComplete |
  FetchInstancesError;
