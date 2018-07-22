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

  getAllTextInput(): Observable<TextInputBlock[]> {
    return this.store$.pipe(select(fromBlocks.getAllTextInput));
  }

  getTextInputEntities(): Observable<{ [id: string]: TextInputBlock }> {
    return this.store$.pipe(select(fromBlocks.getTextInputEntities));
  }

  getTextInputBlocksLoading(): Observable<{ [id: string]: boolean }> {
    return this.store$.pipe(select(fromBlocks.getTextInputBlocksLoadingState));
  }

  updateBlock(block: Update<TextInputBlock>): void {
    this.store$.dispatch(new textInput.UpdateBlock(block));
  }
}
