import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { ModalAlert, modalAlertsActions } from '../../../core/core.module';

import * as instanceListEffects from '../../actions/instance-list-effects.actions';
import * as instanceList from '../../actions/instance-list.actions';

import { Instance } from '../../models';

import * as fromInstanceList from '../../reducers';

@Injectable()
export class InstanceListStoreService {

  constructor(protected store$: Store<fromInstanceList.State>) {
  }

  getFetchedInstances(): Observable<Instance[] | undefined> {
    return this.store$.pipe(select(fromInstanceList.getFetchedInstancesState));
  }

  getFetchLoading(): Observable<boolean> {
    return this.store$.pipe(select(fromInstanceList.getFetchLoadingState));
  }

  getFetchError(): Observable<string | undefined> {
    return this.store$.pipe(select(fromInstanceList.getFetchErrorState));
  }

  dispatchFetchInstances(params: { textSearch: string }): void {
    this.store$.dispatch(new instanceList.FetchInstances(params));
  }

  dispatchShowModalAlert(modalAlert: ModalAlert): void {
    this.store$.dispatch(new modalAlertsActions.ShowModalAlert({ modal: modalAlert }));
  }

  dispatchStartEffects(): void {
    this.store$.dispatch(new instanceListEffects.StartEffects());
  }

  dispatchStopEffects(): void {
    this.store$.dispatch(new instanceListEffects.StopEffects());
  }
}
