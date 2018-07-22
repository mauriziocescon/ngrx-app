import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { CheckBoxConfirmerBlock } from '../models';

export enum CheckBoxConfirmerActionTypes {
  LOADING = '[CheckBoxConfirmerBlock] Loading',
  ADD_BLOCKS = '[CheckBoxConfirmerBlock] Add blocks',
  UPDATE_BLOCK = '[CheckBoxConfirmerBlock] Update block',
  CLEAR_BLOCKS = '[CheckBoxConfirmerBlock] Clear blocks',
}

export class Loading implements Action {
  readonly type = CheckBoxConfirmerActionTypes.LOADING;

  constructor(public payload: { id: string, loading: boolean }) {
  }
}

export class AddBlocks implements Action {
  readonly type = CheckBoxConfirmerActionTypes.ADD_BLOCKS;

  constructor(public payload: CheckBoxConfirmerBlock[]) {
  }
}

export class UpdateBlock implements Action {
  readonly type = CheckBoxConfirmerActionTypes.UPDATE_BLOCK;

  constructor(public payload: Update<CheckBoxConfirmerBlock>) {
  }
}

export class ClearBlocks implements Action {
  readonly type = CheckBoxConfirmerActionTypes.CLEAR_BLOCKS;
}

export type CheckBoxConfirmerActions =
  Loading |
  AddBlocks |
  UpdateBlock |
  ClearBlocks;
