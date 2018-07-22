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

  getAllCheckBox(): Observable<CheckBoxBlock[]> {
    return this.store$.pipe(select(fromBlocks.getAllCheckBox));
  }

  getCheckBoxEntities(): Observable<{ [id: string]: CheckBoxBlock }> {
    return this.store$.pipe(select(fromBlocks.getCheckBoxEntities));
  }

  getCheckBoxBlocksLoading(): Observable<{ [id: string]: boolean }> {
    return this.store$.pipe(select(fromBlocks.getCheckBoxBlocksLoading));
  }

  updateBlock(block: Update<CheckBoxBlock>): void {
    this.store$.dispatch(new checkBox.UpdateBlock(block));
  }
}
