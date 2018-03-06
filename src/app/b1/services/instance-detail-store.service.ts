import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";

import { Block, IInstanceDetailStore } from "../../instance-detail/instance-detail.module";

import * as b1 from "../actions/b1.actions";

import { module } from "../constants";

import * as fromB1 from "../reducers";

@Injectable()
export class B1InstanceDetailStoreService implements IInstanceDetailStore {
  module: string;

  constructor(protected store$: Store<fromB1.State>) {
    this.module = module;
  }

  dispatchStartEffects(): void {
    this.store$.dispatch(new b1.StartEffects());
  }

  dispatchStopEffects(): void {
    this.store$.dispatch(new b1.StopEffects());
  }

  getAllEditedBlocksSelector(): Observable<Block[]> {
    return this.store$.select(fromB1.getAllEditedBlocksState);
  }

  getValiditySelector(): Observable<boolean> {
    return this.store$.select(fromB1.getAllEditedBlocksValidityState);
  }
}
