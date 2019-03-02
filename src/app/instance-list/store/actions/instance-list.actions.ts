import { Action } from '@ngrx/store';

import { Instance } from '../../models';

export enum InstanceListActionTypes {
  LOAD_INSTANCES = '[InstanceList] Load instances',
  LOAD_INSTANCES_SUCCESS = '[InstanceList] Load instances success',
  LOAD_INSTANCES_FAILURE = '[InstanceList] Load instances failure',
}

export class LoadInstances implements Action {
  readonly type = InstanceListActionTypes.LOAD_INSTANCES;

  constructor(public payload: { textSearch: string }) {
  }
}

export class LoadInstancesSuccess implements Action {
  readonly type = InstanceListActionTypes.LOAD_INSTANCES_SUCCESS;

  constructor(public payload: { instances: Instance[] }) {
  }
}

export class LoadInstancesFailure implements Action {
  readonly type = InstanceListActionTypes.LOAD_INSTANCES_FAILURE;

  constructor(public payload: { error: string }) {
  }
}

export type InstanceListActions =
  LoadInstances |
  LoadInstancesSuccess |
  LoadInstancesFailure;
