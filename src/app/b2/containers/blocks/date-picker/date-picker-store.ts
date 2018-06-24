import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs';

import * as datePicker from '../../../actions/blocks/date-picker.actions';

import { DatePickerBlock } from '../../../models';

import * as fromB2Blocks from '../../../reducers';

@Injectable()
export class DatePickerStoreService {

  constructor(protected store$: Store<fromB2Blocks.State>) {
  }

  getAllDatePicker(): Observable<DatePickerBlock[]> {
    return this.store$.pipe(select(fromB2Blocks.getAllDatePicker));
  }

  getDatePickerEntities(): Observable<{ [id: string]: DatePickerBlock }> {
    return this.store$.pipe(select(fromB2Blocks.getDatePickerEntities));
  }

  getDatePickerBlocksLoading(): Observable<{ [id: string]: boolean }> {
    return this.store$.pipe(select(fromB2Blocks.getDatePickerBlocksLoadingState));
  }

  dispatchUpdateBlock(block: { block: Update<DatePickerBlock>, triggerHooks: boolean }): void {
    this.store$.dispatch(new datePicker.UpdateBlock(block));
  }
}
