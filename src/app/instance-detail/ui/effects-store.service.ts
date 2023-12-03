import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { actionGroup } from '../store/instance-detail.actions';

@Injectable()
export class EffectsStoreService {
  protected store$ = inject(Store);

  startEffects(): void {
    this.store$.dispatch(actionGroup.startEffects());
  }

  stopEffects(): void {
    this.store$.dispatch(actionGroup.stopEffects());
  }
}
