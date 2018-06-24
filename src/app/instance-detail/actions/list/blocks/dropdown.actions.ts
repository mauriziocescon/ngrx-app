import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { DropdownBlock } from '../../../models';

export enum DropdownActionTypes {
  LOADING = '[Dropdown] Loading',
  ADD_BLOCKS = '[Dropdown] Add blocks',
  UPDATE_BLOCK = '[Dropdown] Update block',
  CLEAR_BLOCKS = '[Dropdown] Clear blocks',
}

export class Loading implements Action {
  readonly type = DropdownActionTypes.LOADING;

  constructor(public payload: { id: string, loading: boolean }) {
  }
}

export class AddBlocks implements Action {
  readonly type = DropdownActionTypes.ADD_BLOCKS;

  constructor(public payload: DropdownBlock[]) {
  }
}

export class UpdateBlock implements Action {
  readonly type = DropdownActionTypes.UPDATE_BLOCK;

  constructor(public payload: { block: Update<DropdownBlock>, triggerHooks: boolean }) {
  }
}

export class ClearBlocks implements Action {
  readonly type = DropdownActionTypes.CLEAR_BLOCKS;
}

export type DropdownActions =
  Loading |
  AddBlocks |
  UpdateBlock |
  ClearBlocks;
