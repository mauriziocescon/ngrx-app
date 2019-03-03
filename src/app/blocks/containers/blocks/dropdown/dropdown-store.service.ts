import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs';

import * as dropdown from '../../../store/actions/blocks/dropdown.actions';

import { DropdownBlock } from '../../../models';

import * as fromBlocksReducers from '../../../store/reducers';

import * as fromBlocksSelectors from '../../../store/selectors';

@Injectable()
export class DropdownStoreService {

  constructor(protected store$: Store<fromBlocksReducers.State>) {
  }

  getDropdownById(id: string): Observable<DropdownBlock> {
    return this.store$.pipe(select(fromBlocksSelectors.getDropdownEntityById(), { id: id }));
  }

  getDropdownToSyncById(id: string): Observable<DropdownBlock | undefined> {
    return this.store$.pipe(select(fromBlocksSelectors.getDropdownToSyncById(), { id: id }));
  }

  addBlock(block: DropdownBlock): void {
    const payload = { block: block };
    this.store$.dispatch(new dropdown.AddBlock(payload));
  }

  updateBlock(block: Update<DropdownBlock>): void {
    const payload = { block: block };
    this.store$.dispatch(new dropdown.UpdateBlock(payload));
  }

  clearBlock(blockId: string): void {
    const payload = { id: blockId };
    this.store$.dispatch(new dropdown.ClearBlock(payload));
  }

  syncronized(blockId: string): void {
    const payload = { id: blockId };
    this.store$.dispatch(new dropdown.Synchronized(payload));
  }
}
