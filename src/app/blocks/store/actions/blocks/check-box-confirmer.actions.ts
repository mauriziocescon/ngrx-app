import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { CheckBoxConfirmerBlock } from '../../models';

export enum CheckBoxConfirmerActionTypes {
  ADD_BLOCK = '[CheckBoxConfirmer] Add block',
  UPDATE_BLOCK = '[CheckBoxConfirmer] Update block',
  CLEAR_BLOCK = '[CheckBoxConfirmer] Clear block',

  SYNC_REQUIRED = '[CheckBoxConfirmer] Required to synchronize',
  SYNCHRONIZED = '[CheckBoxConfirmer] Synchronized',
}

export class AddBlock implements Action {
  readonly type = CheckBoxConfirmerActionTypes.ADD_BLOCK;

  constructor(public payload: { block: CheckBoxConfirmerBlock }) {
  }
}

export class UpdateBlock implements Action {
  readonly type = CheckBoxConfirmerActionTypes.UPDATE_BLOCK;

  constructor(public payload: { block: Update<CheckBoxConfirmerBlock> }) {
  }
}

export class ClearBlock implements Action {
  readonly type = CheckBoxConfirmerActionTypes.CLEAR_BLOCK;

  constructor(public payload: { id: string }) {
  }
}

export class SyncRequired implements Action {
  readonly type = CheckBoxConfirmerActionTypes.SYNC_REQUIRED;

  constructor(public payload: { id: string, timestamp: number }) {
  }
}

export class Synchronized implements Action {
  readonly type = CheckBoxConfirmerActionTypes.SYNCHRONIZED;

  constructor(public payload: { id: string }) {
  }
}

export type CheckBoxConfirmerActions =
  AddBlock |
  UpdateBlock |
  ClearBlock |
  SyncRequired |
  Synchronized;
