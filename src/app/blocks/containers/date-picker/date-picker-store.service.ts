import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs';

import * as datePicker from '../../actions/date-picker.actions';

import { DatePickerBlock } from '../../models';

import * as fromBlocks from '../../reducers';

@Injectable()
export class DatePickerStoreService {

  constructor(protected store$: Store<fromBlocks.State>) {
  }

  getAllDatePicker(): Observable<DatePickerBlock[]> {
    return this.store$.pipe(select(fromBlocks.getAllDatePicker));
  }

  getDatePickerEntities(): Observable<{ [id: string]: DatePickerBlock }> {
    return this.store$.pipe(select(fromBlocks.getDatePickerEntities));
  }

  getDatePickerBlocksLoading(): Observable<{ [id: string]: boolean }> {
    return this.store$.pipe(select(fromBlocks.getDatePickerBlocksLoading));
  }

  updateBlock(block: Update<DatePickerBlock>): void {
    this.store$.dispatch(new datePicker.UpdateBlock(block));
  }
}
