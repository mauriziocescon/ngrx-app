import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { ModalAlert, modalAlertsActions } from '../../../../../core/core.module';

import { Block } from '../../../../../shared/shared.module';

import * as list from '../../../../actions/list/list.actions';

import * as fromInstanceDetail from '../../../../reducers';

@Injectable()
export class ListStoreService {

  constructor(protected store$: Store<fromInstanceDetail.State>) {
  }

  getFetchedBlocks(): Observable<Block[] | undefined> {
    return this.store$.pipe(select(fromInstanceDetail.getFetchedBlocks));
  }

  getFetchLoading(): Observable<boolean> {
    return this.store$.pipe(select(fromInstanceDetail.getFetchLoading));
  }

  getFetchError(): Observable<string | undefined> {
    return this.store$.pipe(select(fromInstanceDetail.getFetchError));
  }

  fetchBlocks(instance: string): void {
    this.store$.dispatch(new list.FetchBlocks({ instance: instance }));
  }

  clearBlocks(): void {
    this.store$.dispatch(new list.ClearBlocks());
  }

  showModalAlert(modalAlert: ModalAlert): void {
    this.store$.dispatch(new modalAlertsActions.ShowModalAlert({ modal: modalAlert }));
  }
}
