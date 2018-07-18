import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { TextInputBlock } from '../models';

export enum TextInputActionTypes {
  LOADING = '[TextInput] Loading',
  ADD_BLOCKS = '[TextInput] Add blocks',
  UPDATE_BLOCK = '[TextInput] Update block',
  CLEAR_BLOCKS = '[TextInput] Clear blocks',
}

export class Loading implements Action {
  readonly type = TextInputActionTypes.LOADING;

  constructor(public payload: { id: string, loading: boolean }) {
  }
}

export class AddBlocks implements Action {
  readonly type = TextInputActionTypes.ADD_BLOCKS;

  constructor(public payload: TextInputBlock[]) {
  }
}

export class UpdateBlock implements Action {
  readonly type = TextInputActionTypes.UPDATE_BLOCK;

  constructor(public payload: { block: Update<TextInputBlock>, triggerHooks: boolean }) {
  }
}

export class ClearBlocks implements Action {
  readonly type = TextInputActionTypes.CLEAR_BLOCKS;
}

export type TextInputActions =
  Loading |
  AddBlocks |
  UpdateBlock |
  ClearBlocks;
