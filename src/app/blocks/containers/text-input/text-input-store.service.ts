import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs';

import * as textInput from '../../actions/text-input.actions';

import { TextInputBlock } from '../../models';

import * as fromBlocks from '../../reducers';

@Injectable()
export class TextInputStoreService {

  constructor(protected store$: Store<fromBlocks.State>) {
  }

  getTextInputById(id: string): Observable<TextInputBlock> {
    return this.store$.pipe(select(fromBlocks.getTextInputEntityById(), { id: id }));
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
}
