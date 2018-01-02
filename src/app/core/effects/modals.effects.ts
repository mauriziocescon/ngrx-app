import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/observable/fromPromise";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

import { UIUtilitiesService } from "../services/ui-utilities.service";

import { ModalAlertActionTypes, ShowModalAlert } from "../actions/modal-alert.actions";
import { ModalConfirmerActionTypes, ShowModalConfirmer } from "../actions/modal-confirmer.actions";
import { ModalAlert, ModalConfirmer } from "../models";

@Injectable()
export class ModalsEffects {

  constructor(protected actions$: Actions,
              protected uiUtilitiesService: UIUtilitiesService) {
  }

  @Effect() showModalAlert$: Observable<Action> = this.actions$
    .ofType(ModalAlertActionTypes.SHOW_MODAL_ALERT)
    .map((action: ShowModalAlert) => action.payload.modal)
    .switchMap((modalAlert: ModalAlert) => {
      return fromPromise(this.uiUtilitiesService.modalAlert(modalAlert));
    });

  @Effect() showModalConfirmer$: Observable<Action> = this.actions$
    .ofType(ModalConfirmerActionTypes.SHOW_MODAL_CONFIRMER)
    .map((action: ShowModalConfirmer) => action.payload.modal)
    .switchMap((modalConfirmer: ModalConfirmer) => {
      return fromPromise(this.uiUtilitiesService.modalConfirmer(modalConfirmer));
    });
}
