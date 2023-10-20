import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { ModalAlert, ModalConfirmer, ModalConfirmerResultType } from '../models';

import { coreActions } from '../store/core.actions';
import { coreFeature } from '../store/core.reducer';

@Injectable({
  providedIn: 'root',
})
export class ModalStoreService {
  store$ = inject(Store);

  showModalAlert(modalAlert: ModalAlert): void {
    this.store$.dispatch(coreActions.showModalAlert({ modal: modalAlert }));
  }

  getModalConfirmerResults(): Observable<{ [id: string]: ModalConfirmerResultType | undefined }> {
    return this.store$.pipe(select(coreFeature.selectModalConfirmerResults));
  }

  showModalConfirmer(modalConfirmer: ModalConfirmer): void {
    this.store$.dispatch(coreActions.showModalConfirmer({ modal: modalConfirmer }));
  }

  cleanModalConfirmer(payload: { id: string }): void {
    this.store$.dispatch(coreActions.cleanModalConfirmer(payload));
  }
}
