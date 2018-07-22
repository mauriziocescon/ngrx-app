import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs';

import * as dropdown from '../../actions/dropdown.actions';

import { DropdownBlock } from '../../models';

import * as fromBlocks from '../../reducers';

@Injectable()
export class DropdownStoreService {

  constructor(protected store$: Store<fromBlocks.State>) {
  }

  getAllDropdown(): Observable<DropdownBlock[]> {
    return this.store$.pipe(select(fromBlocks.getAllDropdown));
  }

  getDropdownEntities(): Observable<{ [id: string]: DropdownBlock }> {
    return this.store$.pipe(select(fromBlocks.getDropdownEntities));
  }

  getDropdownBlocksLoading(): Observable<{ [id: string]: boolean }> {
    return this.store$.pipe(select(fromBlocks.getDropdownBlocksLoading));
  }

  updateBlock(block: Update<DropdownBlock>): void {
    this.store$.dispatch(new dropdown.UpdateBlock(block));
  }
}
