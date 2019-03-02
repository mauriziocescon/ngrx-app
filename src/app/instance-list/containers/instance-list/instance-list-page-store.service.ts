import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { ModalAlert, modalAlertsActions } from '../../../core/core.module';

import { Instance } from '../../models';

import * as instanceListEffects from '../../store/actions/instance-list-effects.actions';
import * as instanceList from '../../store/actions/instance-list.actions';
import * as fromInstanceListReducer from '../../store/reducers';
import * as fromInstanceListSelectors from '../../store/selectors';

@Injectable()
export class InstanceListStoreService {

  constructor(protected store$: Store<fromInstanceListReducer.State>) {
  }

  getFetchedInstances(): Observable<Instance[] | undefined> {
    return this.store$.pipe(select(fromInstanceListSelectors.getInstances));
  }

  getFetchLoading(): Observable<boolean> {
    return this.store$.pipe(select(fromInstanceListSelectors.isLoading));
  }

  getFetchError(): Observable<string | undefined> {
    return this.store$.pipe(select(fromInstanceListSelectors.getError));
  }

  fetchInstances(params: { textSearch: string }): void {
    this.store$.dispatch(new instanceList.LoadInstances(params));
  }

  showModalAlert(modalAlert: ModalAlert): void {
    this.store$.dispatch(new modalAlertsActions.ShowModalAlert({ modal: modalAlert }));
  }

  startEffects(): void {
    this.store$.dispatch(new instanceListEffects.StartEffects());
  }

  stopEffects(): void {
    this.store$.dispatch(new instanceListEffects.StopEffects());
  }
}
