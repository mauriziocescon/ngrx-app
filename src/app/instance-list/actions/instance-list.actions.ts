import { Action } from '@ngrx/store';

import { Instance } from '../models';

export enum InstanceListActionTypes {
  FETCH_INSTANCES = '[InstanceList] Fetch instances',
  FETCH_INSTANCES_COMPLETE = '[InstanceList] Fetch instances complete',
  FETCH_INSTANCES_ERROR = '[InstanceList] Fetch instances error',
}

export class FetchInstances implements Action {
  readonly type = InstanceListActionTypes.FETCH_INSTANCES;

  constructor(public payload: { textSearch: string }) {
  }
}

export class FetchInstancesComplete implements Action {
  readonly type = InstanceListActionTypes.FETCH_INSTANCES_COMPLETE;

  constructor(public payload: { instances: Instance[] }) {
  }
}

export class FetchInstancesError implements Action {
  readonly type = InstanceListActionTypes.FETCH_INSTANCES_ERROR;

  constructor(public payload: { error: string }) {
  }
}

export type InstanceListActions =
  FetchInstances |
  FetchInstancesComplete |
  FetchInstancesError;
