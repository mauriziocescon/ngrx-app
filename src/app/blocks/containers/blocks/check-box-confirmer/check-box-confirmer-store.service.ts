import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs';

import { ModalConfirmer, ModalConfirmerResultType, modalConfirmersActions } from '../../../../core/core.module';

import * as blockList from '../../../store/actions/block-list.actions';

import { CheckBoxConfirmerBlock } from '../../../models';

import * as fromRoot from '../../../../reducers';
import * as fromBlocksReducers from '../../../store/reducers';

import * as fromBlocksSelectors from '../../../store/selectors';

@Injectable()
export class CheckBoxConfirmerStoreService {

  constructor(protected store$: Store<fromBlocksReducers.State>) {
  }

  getBlockById(id: string): Observable<CheckBoxConfirmerBlock> {
    return this.store$.pipe(select(fromBlocksSelectors.getBlockById(), { id: id }));
  }

  getModalConfirmerResults(): Observable<{ [id: string]: ModalConfirmerResultType | undefined }> {
    return this.store$.pipe(select(fromRoot.getModalConfirmerResults));
  }

  updateBlock(block: Update<CheckBoxConfirmerBlock>): void {
    const payload = { block };
    this.store$.dispatch(new blockList.UpdateBlock(payload));
  }

  showModalConfirmer(modalConfirmer: ModalConfirmer): void {
    this.store$.dispatch(new modalConfirmersActions.ShowModalConfirmer({ modal: modalConfirmer }));
  }

  cleanModalConfirmer(payload: { id: string }): void {
    this.store$.dispatch(new modalConfirmersActions.CleanModalConfirmer(payload));
  }
}
