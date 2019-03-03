import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs';

import * as datePicker from '../../../store/actions/blocks/date-picker.actions';

import { DatePickerBlock } from '../../../models';

import * as fromBlocksReducers from '../../../store/reducers';

import * as fromBlocksSelectors from '../../../store/selectors';

@Injectable()
export class DatePickerStoreService {

  constructor(protected store$: Store<fromBlocksReducers.State>) {
  }

  getDatePickerById(id: string): Observable<DatePickerBlock> {
    return this.store$.pipe(select(fromBlocksSelectors.getDatePickerEntityById(), { id: id }));
  }

  getDatePickerToSyncById(id: string): Observable<DatePickerBlock | undefined> {
    return this.store$.pipe(select(fromBlocksSelectors.getDatePickerToSyncById(), { id: id }));
  }

  addBlock(block: DatePickerBlock): void {
    const payload = { block: block };
    this.store$.dispatch(new datePicker.AddBlock(payload));
  }

  updateBlock(block: Update<DatePickerBlock>): void {
    const payload = { block: block };
    this.store$.dispatch(new datePicker.UpdateBlock(payload));
  }

  clearBlock(blockId: string): void {
    const payload = { id: blockId };
    this.store$.dispatch(new datePicker.ClearBlock(payload));
  }

  syncronized(blockId: string): void {
    const payload = { id: blockId };
    this.store$.dispatch(new datePicker.Synchronized(payload));
  }
}
