import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { ModalAlert, modalAlertsActions } from '../../../core/core.module';

import { Block } from '../../../shared/shared.module';

import * as blockList from '../../actions/block-list.actions';

import * as fromBlocks from '../../reducers';

@Injectable()
export class BlockListStoreService {

  constructor(protected store$: Store<fromBlocks.State>) {
  }

  getFetchedBlocks(): Observable<Block[] | undefined> {
    return this.store$.pipe(select(fromBlocks.getFetchedBlocks));
  }

  getFetchLoading(): Observable<boolean> {
    return this.store$.pipe(select(fromBlocks.getFetchLoading));
  }

  getFetchError(): Observable<string | undefined> {
    return this.store$.pipe(select(fromBlocks.getFetchError));
  }

  fetchBlocks(instance: string): void {
    this.store$.dispatch(new blockList.FetchBlocks({ instance }));
  }

  clearBlocks(): void {
    this.store$.dispatch(new blockList.ClearBlocks());
  }

  showModalAlert(modalAlert: ModalAlert): void {
    this.store$.dispatch(new modalAlertsActions.ShowModalAlert({ modal: modalAlert }));
  }
}
