import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { ModalAlert, ModalConfirmer, ModalConfirmerResultType } from '../models';

import { actionGroup } from '../store/core.actions';
import { feature } from '../store/core.feature';

@Injectable({
  providedIn: 'root',
})
export class ModalStoreService {
  store$ = inject(Store);

  showModalAlert(modalAlert: ModalAlert): void {
    this.store$.dispatch(actionGroup.showModalAlert({ modal: modalAlert }));
  }

  getModalConfirmerResults(): Observable<{ [id: string]: ModalConfirmerResultType | undefined }> {
    return this.store$.pipe(select(feature.selectModalConfirmerResults));
  }

  showModalConfirmer(modalConfirmer: ModalConfirmer): void {
    this.store$.dispatch(actionGroup.showModalConfirmer({ modal: modalConfirmer }));
  }

  cleanModalConfirmer(payload: { id: string }): void {
    this.store$.dispatch(actionGroup.cleanModalConfirmer(payload));
  }
}
