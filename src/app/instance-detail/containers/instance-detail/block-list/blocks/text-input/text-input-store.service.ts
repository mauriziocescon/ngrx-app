import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs';

import * as blockList from '../../../../../store/actions/block-list.actions';

import { TextInputBlock } from '../../../../../models';

import * as fromInstanceDetailReducers from '../../../../../store/reducers';

import * as fromInstanceDetailSelectors from '../../../../../store/selectors';

@Injectable()
export class TextInputStoreService {

  constructor(protected store$: Store<fromInstanceDetailReducers.State>) {
  }

  getBlockById(id: string): Observable<TextInputBlock> {
    return this.store$.pipe(select(fromInstanceDetailSelectors.getBlockById(), { id: id })) as Observable<TextInputBlock>;
  }

  updateBlock(block: Update<TextInputBlock>): void {
    const payload = { block };
    this.store$.dispatch(new blockList.UpdateBlock(payload));
  }
}
