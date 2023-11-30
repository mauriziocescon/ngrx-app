import { inject, Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { actionGroup } from '../../store/instance-detail.actions';
import { feature } from '../../store/instance-detail.feature';

@Injectable()
export class SyncStoreService {
  protected store$ = inject(Store);

  isSyncRequired(): Observable<boolean> {
    return this.store$.pipe(select(feature.isSyncRequired));
  }

  isSyncRequiredWithTimestamp(): Observable<{ syncRequired: boolean, timestamp: number | undefined }> {
    return this.store$.pipe(select(feature.isSyncRequiredWithTimestamp));
  }

  syncRequired(): void {
    this.store$.dispatch(actionGroup.syncRequired({ timestamp: Date.now() }));
  }
}
