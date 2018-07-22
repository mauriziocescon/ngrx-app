import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs';

import { ModalConfirmer, ModalConfirmerResultType, modalConfirmersActions } from '../../../core/core.module';

import * as checkBoxConfirmer from '../../actions/check-box-confirmer.actions';

import { CheckBoxConfirmerBlock } from '../../models';

import * as fromRoot from '../../../reducers';
import * as fromBlocks from '../../reducers';

@Injectable()
export class CheckBoxConfirmerStoreService {

  constructor(protected store$: Store<fromRoot.State>) {
  }

  getAllCheckBoxConfirmer(): Observable<CheckBoxConfirmerBlock[]> {
    return this.store$.pipe(select(fromBlocks.getAllCheckBoxConfirmer));
  }

  getCheckBoxConfirmerEntities(): Observable<{ [id: string]: CheckBoxConfirmerBlock }> {
    return this.store$.pipe(select(fromBlocks.getCheckBoxConfirmerEntities));
  }

  getCheckBoxConfirmerBlocksLoading(): Observable<{ [id: string]: boolean }> {
    return this.store$.pipe(select(fromBlocks.getCheckBoxConfirmerBlocksLoading));
  }

  getModalConfirmerResults(): Observable<{ [id: string]: ModalConfirmerResultType | undefined }> {
    return this.store$.pipe(select(fromRoot.getModalConfirmerResults));
  }

  showModalConfirmer(modalConfirmer: ModalConfirmer): void {
    this.store$.dispatch(new modalConfirmersActions.ShowModalConfirmer({ modal: modalConfirmer }));
  }

  cleanModalConfirmer(payload: { id: string }): void {
    this.store$.dispatch(new modalConfirmersActions.CleanModalConfirmer(payload));
  }

  updateBlock(block: Update<CheckBoxConfirmerBlock>): void {
    this.store$.dispatch(new checkBoxConfirmer.UpdateBlock(block));
  }
}
