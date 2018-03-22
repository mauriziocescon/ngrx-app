import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { Block, IInstanceDetailStore } from '../../instance-detail/instance-detail.module';

import * as b2Effects from '../actions/b2-effects.actions';

import { module } from '../constants';

import * as fromB2 from '../reducers';

@Injectable()
export class B2InstanceDetailStoreService implements IInstanceDetailStore {
  module: string;

  constructor(protected store$: Store<fromB2.State>) {
    this.module = module;
  }

  dispatchStartEffects(): void {
    this.store$.dispatch(new b2Effects.StartEffects());
  }

  dispatchStopEffects(): void {
    this.store$.dispatch(new b2Effects.StopEffects());
  }

  getAllEditedBlocksSelector(): Observable<Block[]> {
    return this.store$.select(fromB2.getAllEditedBlocksState);
  }

  getValiditySelector(): Observable<boolean> {
    return this.store$.select(fromB2.getAllEditedBlocksValidityState);
  }
}
