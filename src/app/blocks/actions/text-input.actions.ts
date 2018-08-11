import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { TextInputBlock } from '../models';

export enum TextInputActionTypes {
  ADD_BLOCK = '[TextInput] Add block',
  UPDATE_BLOCK = '[TextInput] Update block',
  CLEAR_BLOCK = '[TextInput] Clear block',
}

export class AddBlock implements Action {
  readonly type = TextInputActionTypes.ADD_BLOCK;

  constructor(public payload: { block: TextInputBlock }) {
  }
}

export class UpdateBlock implements Action {
  readonly type = TextInputActionTypes.UPDATE_BLOCK;

  constructor(public payload: { block: Update<TextInputBlock> }) {
  }
}

export class ClearBlock implements Action {
  readonly type = TextInputActionTypes.CLEAR_BLOCK;

  constructor(public payload: { id: string }) {
  }
}

export type TextInputActions =
  AddBlock |
  UpdateBlock |
  ClearBlock;
