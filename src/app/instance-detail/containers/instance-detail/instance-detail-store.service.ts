import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";

import * as fromInstanceDetail from "../../reducers";

@Injectable()
export class InstanceDetailStoreService {

  constructor(protected store$: Store<fromInstanceDetail.State>) {
  }

  isSynchronizationRequired(): Observable<boolean> {
    return this.store$.select(fromInstanceDetail.isSynchronizationRequiredState);
  }
}
