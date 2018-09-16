import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ModalAlert, modalAlertsActions } from '../../../../core/core.module';
import { Block } from '../../../../shared/shared.module';

import * as blockList from '../../../../blocks/actions/block-list.actions';
import * as sync from '../../../../blocks/actions/sync.actions';

import * as fromBlocks from '../../../../blocks/reducers';

@Injectable()
export class NextStepStoreService {

  constructor(protected store$: Store<fromBlocks.State>) {
  }

  getSyncRequired(): Observable<boolean> {
    return this.store$.pipe(
      select(fromBlocks.isSyncRequired),
      map(data => data.syncRequired),
    );
  }

  getUpdateError(): Observable<string | undefined> {
    return this.store$.pipe(select(fromBlocks.getSyncError));
  }

  syncBlocks(payload: { instance: string, blocks: Block[] }): void {
    this.store$.dispatch(new blockList.SyncBlocks(payload));
  }

  syncRequired(): void {
    this.store$.dispatch(new sync.SyncRequired(Date.now()));
  }

  showModalAlert(modalAlert: ModalAlert): void {
    this.store$.dispatch(new modalAlertsActions.ShowModalAlert({ modal: modalAlert }));
  }
}
