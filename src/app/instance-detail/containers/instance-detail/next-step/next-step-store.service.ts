import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { ModalAlert, modalAlertsActions } from '../../../../core/core.module';

import * as list from '../../../actions/list/list.actions';
import * as sync from '../../../actions/list/sync.actions';

import { Block } from '../../../models';

import * as fromInstanceDetail from '../../../reducers';

@Injectable()
export class NextStepStoreService {

  constructor(protected store$: Store<fromInstanceDetail.State>) {
  }

  getSyncRequired(): Observable<boolean> {
    return this.store$.pipe(select(fromInstanceDetail.isSynchronizationRequiredState));
  }

  getSyncRequiredWithTimestamp(): Observable<{ syncRequired: boolean, timestamp: number | undefined }> {
    return this.store$.pipe(select(fromInstanceDetail.isSynchronizationRequiredWithTimestampState));
  }

  getUpdateError(): Observable<string | undefined> {
    return this.store$.pipe(select(fromInstanceDetail.getSyncErrorState));
  }

  dispatchShowModalAlert(modalAlert: ModalAlert): void {
    this.store$.dispatch(new modalAlertsActions.ShowModalAlert({ modal: modalAlert }));
  }

  dispatchSyncBlocks(payload: { module: string, instance: string, step: string, blocks: Block[] }): void {
    this.store$.dispatch(new list.SyncBlocks(payload));
  }

  dispatchSyncRequired(): void {
    this.store$.dispatch(new sync.SyncRequired(Date.now()));
  }
}
