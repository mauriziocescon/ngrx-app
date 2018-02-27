import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";

import { Block } from "../../models";

import * as fromInstanceDetail from "../../reducers";

import { IInstanceDetailStore } from "../../tokens";

@Injectable()
export class InstanceDetailStoreService implements IInstanceDetailStore {
  key: string;

  constructor(protected store$: Store<fromInstanceDetail.State>) {
    this.key = "base";
  }

  isSynchronizationRequired(): Observable<boolean> {
    return this.store$.select(fromInstanceDetail.isSynchronizationRequiredState);
  }

  getAllEditedBlocksSelector(): Observable<Block[]> {
    return this.store$.select(fromInstanceDetail.getAllEditedBlocksState);
  }

  getValiditySelector(): Observable<boolean> {
    return this.store$.select(fromInstanceDetail.getAllEditedBlocksValidityState);
  }
}
