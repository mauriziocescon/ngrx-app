import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as effects from '../../store/actions/instance-list-effects.actions';

import * as fromInstanceListReducers from '../../store/reducers';

@Injectable()
export class EffectsStoreService {

  constructor(protected store$: Store<fromInstanceListReducers.State>) {
  }

  startEffects(): void {
    this.store$.dispatch(new effects.StartEffects());
  }

  stopEffects(): void {
    this.store$.dispatch(new effects.StopEffects());
  }
}
