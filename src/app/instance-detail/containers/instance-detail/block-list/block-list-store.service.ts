import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { ModalAlert, modalAlertsActions } from '../../../../core/core.module';

import { Block } from '../../../../shared/shared.module';

import * as blockList from '../../../store/actions/block-list.actions';

import * as fromBlocksReducers from '../../../store/reducers';

import * as fromBlocksSelectors from '../../../store/selectors';

@Injectable()
export class BlockListStoreService {

  constructor(protected store$: Store<fromBlocksReducers.State>) {
  }

  isLoadingBlocks(): Observable<boolean> {
    return this.store$.pipe(select(fromBlocksSelectors.isLoadingBlocks));
  }

  getLoadingError(): Observable<string | undefined> {
    return this.store$.pipe(select(fromBlocksSelectors.getLoadingError));
  }

  getEditedBlocks(): Observable<Block[] | undefined> {
    return this.store$.pipe(select(fromBlocksSelectors.getEditedBlocks));
  }

  loadBlocks(instanceId: string): void {
    this.store$.dispatch(new blockList.LoadBlocks({ instanceId }));
  }

  syncBlocks(instanceId: string, blocks: Block[]): void {
    this.store$.dispatch(new blockList.SyncBlocks({ instanceId, blocks }));
  }

  clearBlocks(): void {
    this.store$.dispatch(new blockList.ClearBlocks());
  }

  showModalAlert(modalAlert: ModalAlert): void {
    this.store$.dispatch(new modalAlertsActions.ShowModalAlert({ modal: modalAlert }));
  }
}
