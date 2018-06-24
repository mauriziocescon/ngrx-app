import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { DatePickerBlock } from '../../models';

export enum DatePickerActionTypes {
  LOADING = '[DatePickerBlock] Loading',
  ADD_BLOCKS = '[DatePickerBlock] Add blocks',
  UPDATE_BLOCK = '[DatePickerBlock] Update block',
  CLEAR_BLOCKS = '[DatePickerBlock] Clear blocks',
}

export class Loading implements Action {
  readonly type = DatePickerActionTypes.LOADING;

  constructor(public payload: { id: string, loading: boolean }) {
  }
}

export class AddBlocks implements Action {
  readonly type = DatePickerActionTypes.ADD_BLOCKS;

  constructor(public payload: DatePickerBlock[]) {
  }
}

export class UpdateBlock implements Action {
  readonly type = DatePickerActionTypes.UPDATE_BLOCK;

  constructor(public payload: { block: Update<DatePickerBlock>, triggerHooks: boolean }) {
  }
}

export class ClearBlocks implements Action {
  readonly type = DatePickerActionTypes.CLEAR_BLOCKS;
}

export type DatePickerActions =
  Loading |
  AddBlocks |
  UpdateBlock |
  ClearBlocks;
