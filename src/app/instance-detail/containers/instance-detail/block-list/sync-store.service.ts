import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as sync from '../../../store/actions/sync.actions';

import * as fromSyncReducers from '../../../store/reducers';

import * as fromSyncSelectors from '../../../store/selectors';

@Injectable()
export class SyncStoreService {

  constructor(protected store$: Store<fromSyncReducers.State>) {
  }

  isLoadingBlocks(): Observable<boolean> {
    return this.store$.pipe(select(fromSyncSelectors.isSyncRequired));
  }

  isSyncRequiredWithTimestamp(): Observable<{ syncRequired: boolean, timestamp: number | undefined }> {
    return this.store$.pipe(select(fromSyncSelectors.isSyncRequiredWithTimestamp));
  }
}
