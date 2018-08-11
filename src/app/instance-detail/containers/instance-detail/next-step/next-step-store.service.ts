import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { ModalAlert, modalAlertsActions } from '../../../../core/core.module';

import * as list from '../../../actions/list/list.actions';
import * as sync from '../../../actions/list/sync.actions';

import { Block } from '../../../../shared/shared.module';

import * as fromInstanceDetail from '../../../reducers';

@Injectable()
export class NextStepStoreService {

  constructor(protected store$: Store<fromInstanceDetail.State>) {
  }

  getSyncRequired(): Observable<boolean> {
    return this.store$.pipe(select(fromInstanceDetail.isSynchronizationRequired));
  }

  getSyncRequiredWithTimestamp(): Observable<{ syncRequired: boolean, timestamp: number | undefined }> {
    return this.store$.pipe(select(fromInstanceDetail.isSynchronizationRequiredWithTimestamp));
  }

  getUpdateError(): Observable<string | undefined> {
    return this.store$.pipe(select(fromInstanceDetail.getSyncError));
  }

  syncBlocks(payload: { instance: string, blocks: Block[] }): void {
    this.store$.dispatch(new list.SyncBlocks(payload));
  }

  syncRequired(): void {
    this.store$.dispatch(new sync.SyncRequired(Date.now()));
  }

  showModalAlert(modalAlert: ModalAlert): void {
    this.store$.dispatch(new modalAlertsActions.ShowModalAlert({ modal: modalAlert }));
  }
}
