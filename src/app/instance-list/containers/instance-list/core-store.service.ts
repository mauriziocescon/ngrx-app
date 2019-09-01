import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import {
  ModalAlert,
  ModalConfirmer,
  ModalConfirmerResultType,
  modalAlertsActions,
  modalConfirmersActions,
} from '../../../core/core.module';

import * as fromRootReducers from '../../../reducers';

@Injectable()
export class CoreStoreService {

  constructor(protected store$: Store<fromRootReducers.State>) {
  }

  showModalAlert(modalAlert: ModalAlert): void {
    this.store$.dispatch(new modalAlertsActions.ShowModalAlert({ modal: modalAlert }));
  }

  getModalConfirmerResults(): Observable<{ [id: string]: ModalConfirmerResultType | undefined }> {
    return this.store$.pipe(select(fromRootReducers.getModalConfirmerResults));
  }

  showModalConfirmer(modalConfirmer: ModalConfirmer): void {
    this.store$.dispatch(new modalConfirmersActions.ShowModalConfirmer({ modal: modalConfirmer }));
  }

  cleanModalConfirmer(payload: { id: string }): void {
    this.store$.dispatch(new modalConfirmersActions.CleanModalConfirmer(payload));
  }
}
