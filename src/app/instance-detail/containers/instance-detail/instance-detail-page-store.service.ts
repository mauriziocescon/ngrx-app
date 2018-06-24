import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as list from '../../actions/list/list.actions';

import * as fromInstanceDetail from '../../reducers';

@Injectable()
export class InstanceDetailPageStoreService {

  constructor(protected store$: Store<fromInstanceDetail.State>) {
  }

  isSynchronizationRequired(): Observable<boolean> {
    return this.store$.pipe(select(fromInstanceDetail.isSynchronizationRequiredState));
  }

  dispatchClearBlocks(): void {
    this.store$.dispatch(new list.ClearBlocks());
  }
}
