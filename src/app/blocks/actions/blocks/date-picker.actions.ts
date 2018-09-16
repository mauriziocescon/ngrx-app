import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { DatePickerBlock } from '../../models';

export enum DatePickerActionTypes {
  ADD_BLOCK = '[DatePicker] Add block',
  UPDATE_BLOCK = '[DatePicker] Update block',
  CLEAR_BLOCK = '[DatePicker] Clear block',
}

export class AddBlock implements Action {
  readonly type = DatePickerActionTypes.ADD_BLOCK;

  constructor(public payload: { block: DatePickerBlock }) {
  }
}

export class UpdateBlock implements Action {
  readonly type = DatePickerActionTypes.UPDATE_BLOCK;

  constructor(public payload: { block: Update<DatePickerBlock> }) {
  }
}

export class ClearBlock implements Action {
  readonly type = DatePickerActionTypes.CLEAR_BLOCK;

  constructor(public payload: { id: string }) {
  }
}

export type DatePickerActions =
  AddBlock |
  UpdateBlock |
  ClearBlock;
