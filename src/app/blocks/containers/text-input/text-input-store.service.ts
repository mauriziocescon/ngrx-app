import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs';

import * as textInput from '../../actions/text-input.actions';

import { TextInputBlock } from '../../models';

import * as fromInstanceDetail from '../../reducers';

@Injectable()
export class TextInputStoreService {

  constructor(protected store$: Store<fromInstanceDetail.State>) {
  }

  getAllTextInput(): Observable<TextInputBlock[]> {
    return this.store$.pipe(select(fromInstanceDetail.getAllTextInput));
  }

  getTextInputEntities(): Observable<{ [id: string]: TextInputBlock }> {
    return this.store$.pipe(select(fromInstanceDetail.getTextInputEntities));
  }

  getTextInputBlocksLoading(): Observable<{ [id: string]: boolean }> {
    return this.store$.pipe(select(fromInstanceDetail.getTextInputBlocksLoadingState));
  }

  dispatchUpdateBlock(block: { block: Update<TextInputBlock>, triggerHooks: boolean }): void {
    this.store$.dispatch(new textInput.UpdateBlock(block));
  }
}
