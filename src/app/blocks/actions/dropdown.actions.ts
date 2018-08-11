import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { DropdownBlock } from '../models';

export enum DropdownActionTypes {
  ADD_BLOCK = '[Dropdown] Add block',
  UPDATE_BLOCK = '[Dropdown] Update block',
  CLEAR_BLOCK = '[Dropdown] Clear block',
}

export class AddBlock implements Action {
  readonly type = DropdownActionTypes.ADD_BLOCK;

  constructor(public payload: { block: DropdownBlock }) {
  }
}

export class UpdateBlock implements Action {
  readonly type = DropdownActionTypes.UPDATE_BLOCK;

  constructor(public payload: { block: Update<DropdownBlock> }) {
  }
}

export class ClearBlock implements Action {
  readonly type = DropdownActionTypes.CLEAR_BLOCK;

  constructor(public payload: { id: string }) {
  }
}

export type DropdownActions =
  AddBlock |
  UpdateBlock |
  ClearBlock;
