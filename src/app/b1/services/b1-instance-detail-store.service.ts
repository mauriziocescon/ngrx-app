import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { Block, IInstanceDetailStore } from '../../instance-detail/instance-detail.module';

import * as b1Effects from '../actions/b1-effects.actions';

import { module } from '../constants';

import * as fromB1 from '../reducers';

@Injectable()
export class B1InstanceDetailStoreService implements IInstanceDetailStore {
  module: string;

  constructor(protected store$: Store<fromB1.State>) {
    this.module = module;
  }

  dispatchStartEffects(): void {
    this.store$.dispatch(new b1Effects.StartEffects());
  }

  dispatchStopEffects(): void {
    this.store$.dispatch(new b1Effects.StopEffects());
  }

  getAllEditedBlocksSelector(): Observable<Block[]> {
    return this.store$.pipe(select(fromB1.getAllEditedBlocksState));
  }

  getValiditySelector(): Observable<boolean> {
    return this.store$.pipe(select(fromB1.getAllEditedBlocksValidityState));
  }
}
