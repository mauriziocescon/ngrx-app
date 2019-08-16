import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs';

import * as blockList from '../../../../../store/actions/block-list.actions';

import { DropdownBlock } from '../../../../../models';

import * as fromBlocksReducers from '../../../../../store/reducers';

import * as fromBlocksSelectors from '../../../../../store/selectors';

@Injectable()
export class DropdownStoreService {

  constructor(protected store$: Store<fromBlocksReducers.State>) {
  }

  getBlockById(id: string): Observable<DropdownBlock> {
    return this.store$.pipe(select(fromBlocksSelectors.getBlockById(), { id: id })) as Observable<DropdownBlock>;
  }

  updateBlock(block: Update<DropdownBlock>): void {
    const payload = { block };
    this.store$.dispatch(new blockList.UpdateBlock(payload));
  }
}
