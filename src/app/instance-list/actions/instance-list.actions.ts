import { Action } from '@ngrx/store';

import { Instance } from '../models';

export enum InstanceListActionTypes {
  FETCH_INSTANCES = '[InstanceList] Fetch instances',
  FETCH_INSTANCES_SUCCESS = '[InstanceList] Fetch instances success',
  FETCH_INSTANCES_FAILURE = '[InstanceList] Fetch instances failure',
}

export class FetchInstances implements Action {
  readonly type = InstanceListActionTypes.FETCH_INSTANCES;

  constructor(public payload: { textSearch: string }) {
  }
}

export class FetchInstancesSuccess implements Action {
  readonly type = InstanceListActionTypes.FETCH_INSTANCES_SUCCESS;

  constructor(public payload: { instances: Instance[] }) {
  }
}

export class FetchInstancesFailure implements Action {
  readonly type = InstanceListActionTypes.FETCH_INSTANCES_FAILURE;

  constructor(public payload: { error: string }) {
  }
}

export type InstanceListActions =
  FetchInstances |
  FetchInstancesSuccess |
  FetchInstancesFailure;
