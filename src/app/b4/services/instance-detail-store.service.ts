import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { Block, IInstanceDetailStore } from '../../instance-detail/instance-detail.module';

import * as b4Effects from '../actions/b4-effects.actions';

import { module } from '../constants';

import * as fromB4 from '../reducers';

@Injectable()
export class B4InstanceDetailStoreService implements IInstanceDetailStore {
  module: string;

  constructor(protected store$: Store<fromB4.State>) {
    this.module = module;
  }

  dispatchStartEffects(): void {
    this.store$.dispatch(new b4Effects.StartEffects());
  }

  dispatchStopEffects(): void {
    this.store$.dispatch(new b4Effects.StopEffects());
  }

  getAllEditedBlocksSelector(): Observable<Block[]> {
    return this.store$.select(fromB4.getAllEditedBlocksState);
  }

  getValiditySelector(): Observable<boolean> {
    return this.store$.select(fromB4.getAllEditedBlocksValidityState);
  }
}
