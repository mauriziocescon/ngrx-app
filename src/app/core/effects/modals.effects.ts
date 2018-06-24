import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { UIUtilitiesService } from '../services/ui-utilities.service';

import { ModalAlertActionTypes, ShowModalAlert } from '../actions/modal-alert.actions';
import { ModalConfirmerActionTypes, ShowModalConfirmer } from '../actions/modal-confirmer.actions';
import { ModalAlert, ModalConfirmer } from '../models';

@Injectable()
export class ModalsEffects {

  constructor(protected actions$: Actions,
              protected uiUtilities: UIUtilitiesService) {
  }

  @Effect() showModalAlert$: Observable<Action> = this.actions$
    .pipe(
      ofType<ShowModalAlert>(ModalAlertActionTypes.SHOW_MODAL_ALERT),
      map(action => action.payload.modal),
      switchMap((modalAlert: ModalAlert) => {
        return from(this.uiUtilities.modalAlert(modalAlert));
      }),
    );

  @Effect() showModalConfirmer$: Observable<Action> = this.actions$
    .pipe(
      ofType<ShowModalConfirmer>(ModalConfirmerActionTypes.SHOW_MODAL_CONFIRMER),
      map(action => action.payload.modal),
      switchMap((modalConfirmer: ModalConfirmer) => {
        return from(this.uiUtilities.modalConfirmer(modalConfirmer));
      }),
    );
}
