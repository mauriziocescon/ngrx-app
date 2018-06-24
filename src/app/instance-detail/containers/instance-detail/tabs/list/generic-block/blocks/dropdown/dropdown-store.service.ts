import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs';

import * as dropdown from '../../../../../../../actions/list/blocks/dropdown.actions';

import { DropdownBlock } from '../../../../../../../models';

import * as fromInstanceDetail from '../../../../../../../reducers';

@Injectable()
export class DropdownStoreService {

  constructor(protected store$: Store<fromInstanceDetail.State>) {
  }

  getAllDropdown(): Observable<DropdownBlock[]> {
    return this.store$.pipe(select(fromInstanceDetail.getAllDropdown));
  }

  getDropdownEntities(): Observable<{ [id: string]: DropdownBlock }> {
    return this.store$.pipe(select(fromInstanceDetail.getDropdownEntities));
  }

  getDropdownBlocksLoading(): Observable<{ [id: string]: boolean }> {
    return this.store$.pipe(select(fromInstanceDetail.getDropdownBlocksLoadingState));
  }

  dispatchUpdateBlock(block: { block: Update<DropdownBlock>, triggerHooks: boolean }): void {
    this.store$.dispatch(new dropdown.UpdateBlock(block));
  }
}
