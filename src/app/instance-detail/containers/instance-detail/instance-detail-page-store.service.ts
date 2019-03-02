import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as instanceDetailEffects from '../../store/actions/instance-detail-effects.actions';

import * as fromInstanceDetail from '../../../instance-detail/reducers';

@Injectable()
export class InstanceDetailPageStoreService {

  constructor(protected store$: Store<fromInstanceDetail.State>) {
  }

  startEffects(): void {
    this.store$.dispatch(new instanceDetailEffects.StartEffects());
  }

  stopEffects(): void {
    this.store$.dispatch(new instanceDetailEffects.StopEffects());
  }
}
