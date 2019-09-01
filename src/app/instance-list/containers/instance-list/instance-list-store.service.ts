import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { Instance } from '../../models';

import * as instanceList from '../../store/actions/instance-list.actions';

import * as fromInstanceListReducer from '../../store/reducers';

import * as fromInstanceListSelectors from '../../store/selectors';

@Injectable()
export class InstanceListStoreService {

  constructor(protected store$: Store<fromInstanceListReducer.State>) {
  }

  getInstances(): Observable<Instance[] | undefined> {
    return this.store$.pipe(select(fromInstanceListSelectors.getInstances));
  }

  isLoadingInstances(): Observable<boolean> {
    return this.store$.pipe(select(fromInstanceListSelectors.isLoading));
  }

  getLoadingError(): Observable<string | undefined> {
    return this.store$.pipe(select(fromInstanceListSelectors.getError));
  }

  loadInstances(params: { textSearch: string }): void {
    this.store$.dispatch(new instanceList.LoadInstances(params));
  }
}
