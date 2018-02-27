import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";

import { Block, IInstanceDetailStore } from "../../instance-detail/instance-detail.module";

import * as fromB1 from "../reducers";

@Injectable()
export class B1InstanceDetailStoreService implements IInstanceDetailStore {
  key: string;

  constructor(protected store$: Store<fromB1.State>) {
    this.key = "b1";
  }

  getAllEditedBlocksSelector(): Observable<Block[]> {
    return this.store$.select(fromB1.getAllEditedBlocksState);
  }

  getValiditySelector(): Observable<boolean> {
    return this.store$.select(fromB1.getAllEditedBlocksValidityState);
  }
}
