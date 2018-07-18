import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs';

import * as checkBox from '../../actions/check-box.actions';

import { CheckBoxBlock } from '../../models';

import * as fromInstanceDetail from '../../reducers';

@Injectable()
export class CheckBoxStoreService {

  constructor(protected store$: Store<fromInstanceDetail.State>) {
  }

  getAllCheckBox(): Observable<CheckBoxBlock[]> {
    return this.store$.pipe(select(fromInstanceDetail.getAllCheckBox));
  }

  getCheckBoxEntities(): Observable<{ [id: string]: CheckBoxBlock }> {
    return this.store$.pipe(select(fromInstanceDetail.getCheckBoxEntities));
  }

  getCheckBoxBlocksLoading(): Observable<{ [id: string]: boolean }> {
    return this.store$.pipe(select(fromInstanceDetail.getCheckBoxBlocksLoadingState));
  }

  dispatchUpdateBlock(block: { block: Update<CheckBoxBlock>, triggerHooks: boolean }): void {
    this.store$.dispatch(new checkBox.UpdateBlock(block));
  }
}
