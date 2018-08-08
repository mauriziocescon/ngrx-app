import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as instanceDetailEffects from '../../actions/instance-detail-effects.actions';
import * as list from '../../actions/list/list.actions';

import * as fromInstanceDetail from '../../reducers';

@Injectable()
export class InstanceDetailPageStoreService {

  constructor(protected store$: Store<fromInstanceDetail.State>) {
  }

  dispatchStartEffects(): void {
    this.store$.dispatch(new instanceDetailEffects.StartEffects());
  }

  dispatchStopEffects(): void {
    this.store$.dispatch(new instanceDetailEffects.StopEffects());
  }

  isSynchronizationRequired(): Observable<boolean> {
    return this.store$.pipe(select(fromInstanceDetail.isSynchronizationRequiredState));
  }

  dispatchClearBlocks(): void {
    this.store$.dispatch(new list.ClearBlocks());
  }
}
