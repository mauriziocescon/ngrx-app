import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs';

import * as checkBox from '../../actions/check-box.actions';

import { CheckBoxBlock } from '../../models';

import * as fromBlocks from '../../reducers';

@Injectable()
export class CheckBoxStoreService {

  constructor(protected store$: Store<fromBlocks.State>) {
  }

  getCheckBoxById(id: string): Observable<CheckBoxBlock> {
    return this.store$.pipe(select(fromBlocks.getCheckBoxEntityById(), { id: id }));
  }

  addBlock(block: CheckBoxBlock): void {
    const payload = { block: block };
    this.store$.dispatch(new checkBox.AddBlock(payload));
  }

  updateBlock(block: Update<CheckBoxBlock>): void {
    const payload = { block: block };
    this.store$.dispatch(new checkBox.UpdateBlock(payload));
  }

  clearBlock(blockId: string): void {
    const payload = { id: blockId };
    this.store$.dispatch(new checkBox.ClearBlock(payload));
  }
}
