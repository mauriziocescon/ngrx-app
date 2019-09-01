import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as sync from '../../store/actions/sync.actions';

import * as fromInstanceDetailReducers from '../../store/reducers';

import * as fromInstanceDetailSelectors from '../../store/selectors';

@Injectable()
export class SyncStoreService {

  constructor(protected store$: Store<fromInstanceDetailReducers.State>) {
  }

  isSyncRequired(): Observable<boolean> {
    return this.store$.pipe(select(fromInstanceDetailSelectors.isSyncRequired));
  }

  isSyncRequiredWithTimestamp(): Observable<{ syncRequired: boolean, timestamp: number | undefined }> {
    return this.store$.pipe(select(fromInstanceDetailSelectors.isSyncRequiredWithTimestamp));
  }

  syncRequired(): void {
    this.store$.dispatch(new sync.SyncRequired(Date.now()));
  }
}
