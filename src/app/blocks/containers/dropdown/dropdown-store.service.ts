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

  getDropdownById(id: string): Observable<DropdownBlock> {
    return this.store$.pipe(select(fromBlocks.getDropdownEntityById(), { id: id }));
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
}
