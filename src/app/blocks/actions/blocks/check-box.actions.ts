import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { CheckBoxBlock } from '../../models';

export enum CheckBoxActionTypes {
  ADD_BLOCK = '[CheckBox] Add block',
  UPDATE_BLOCK = '[CheckBox] Update block',
  CLEAR_BLOCK = '[CheckBox] Clear block',
}

export class AddBlock implements Action {
  readonly type = CheckBoxActionTypes.ADD_BLOCK;

  constructor(public payload: { block: CheckBoxBlock }) {
  }
}

export class UpdateBlock implements Action {
  readonly type = CheckBoxActionTypes.UPDATE_BLOCK;

  constructor(public payload: { block: Update<CheckBoxBlock> }) {
  }
}

export class ClearBlock implements Action {
  readonly type = CheckBoxActionTypes.CLEAR_BLOCK;

  constructor(public payload: { id: string }) {
  }
}

export type CheckBoxActions =
  AddBlock |
  UpdateBlock |
  ClearBlock;
