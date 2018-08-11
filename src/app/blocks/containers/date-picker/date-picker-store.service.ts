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

  getDatePickerEntities(): Observable<{ [id: string]: DatePickerBlock }> {
    return this.store$.pipe(select(fromBlocks.getDatePickerEntities));
  }
}
