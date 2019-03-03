import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs';

import * as checkBox from '../../../store/actions/blocks/check-box.actions';

import { CheckBoxBlock } from '../../../models';

import * as fromBlocksReducers from '../../../store/reducers';

import * as fromBlocksSelectors from '../../../store/selectors';

@Injectable()
export class CheckBoxStoreService {

  constructor(protected store$: Store<fromBlocksReducers.State>) {
  }

  getCheckBoxById(id: string): Observable<CheckBoxBlock> {
    return this.store$.pipe(select(fromBlocksSelectors.getCheckBoxEntityById(), { id: id }));
  }

  getCheckBoxToSyncById(id: string): Observable<CheckBoxBlock | undefined> {
    return this.store$.pipe(select(fromBlocksSelectors.getCheckBoxToSyncById(), { id: id }));
  }

  addBlock(block: CheckBoxBlock): void {
    const payload = { block: block };
    this.store$.dispatch(new checkBox.AddBlock(payload));
  }

  updateBlock(block: Update<CheckBoxBlock>): void {
    const payload = { block: block };
    this.store$.dispatch(new checkBox.UpdateBlock(payload));
  }

  clearBlock(blockId: string): void {
    const payload = { id: blockId };
    this.store$.dispatch(new checkBox.ClearBlock(payload));
  }

  syncronized(blockId: string): void {
    const payload = { id: blockId };
    this.store$.dispatch(new checkBox.Synchronized(payload));
  }
}
