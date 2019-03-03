import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs';

import * as textInput from '../../../store/actions/blocks/text-input.actions';

import { TextInputBlock } from '../../../models';

import * as fromBlocksReducers from '../../../store/reducers';

import * as fromBlocksSelectors from '../../../store/selectors';

@Injectable()
export class TextInputStoreService {

  constructor(protected store$: Store<fromBlocksReducers.State>) {
  }

  getTextInputById(id: string): Observable<TextInputBlock> {
    return this.store$.pipe(select(fromBlocksSelectors.getTextInputEntityById(), { id: id }));
  }

  getTextInputToSyncById(id: string): Observable<TextInputBlock | undefined> {
    return this.store$.pipe(select(fromBlocksSelectors.getTextInputToSyncById(), { id: id }));
  }

  addBlock(block: TextInputBlock): void {
    const payload = { block: block };
    this.store$.dispatch(new textInput.AddBlock(payload));
  }

  updateBlock(block: Update<TextInputBlock>): void {
    const payload = { block: block };
    this.store$.dispatch(new textInput.UpdateBlock(payload));
  }

  clearBlock(blockId: string): void {
    const payload = { id: blockId };
    this.store$.dispatch(new textInput.ClearBlock(payload));
  }

  syncronized(blockId: string): void {
    const payload = { id: blockId };
    this.store$.dispatch(new textInput.Synchronized(payload));
  }
}
