import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/observable/fromPromise";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

import { UIUtilitiesService } from "../services/ui-utilities.service";

import { ModalsActionTypes, AddModal, UpdateModal, DeleteModal, DeleteModals } from "../actions/modals.actions";
import { Modal, ModalType, ModalAlert, ModalConfirmer } from "../models";

@Injectable()
export class ModalsEffects {

  constructor(private actions$: Actions,
              private uiUtilitiesService: UIUtilitiesService) {
  }

  @Effect() addModal$: Observable<Action> = this.actions$
    .ofType(ModalsActionTypes.ADD_MODAL)
    .map((action: AddModal) => action.payload.modal)
    .switchMap((modal: Modal) => {
      if (modal.type === ModalType.Alert) {
        const modalAlert = modal as ModalAlert;
        return fromPromise(this.uiUtilitiesService.modalAlert(modalAlert));
      } else {
        const modalConfirmer = modal as ModalConfirmer;
        return fromPromise(this.uiUtilitiesService.modalConfirmer(modalConfirmer));
      }
    });

  // @Effect() updateModal$: Observable<Action> = this.actions$
  //   .ofType(ModalsActionTypes.UPDATE_MODAL)
  //   .map((action: UpdateModal) => action.payload.modal)
  //   .map((modal: { id: string, changes: Modal }) => {
  //     const newModal = {
  //       modal: {
  //         id: modal.id,
  //         changes: {
  //           ...modal.changes,
  //         },
  //       },
  //     };
  //     return new UpdateModal(newModal);
  //   });
  //
  // @Effect() deleteModal$: Observable<Action> = this.actions$
  //   .ofType(ModalsActionTypes.DELETE_MODAL)
  //   .map((action: DeleteModal) => action.payload.id)
  //   .map((id: string) => {
  //     return new DeleteModal({id: id});
  //   });
  //
  // @Effect() deleteModals$: Observable<Action> = this.actions$
  //   .ofType(ModalsActionTypes.DELETE_MODALS)
  //   .map((action: DeleteModals) => action.payload.ids)
  //   .map((ids: string[]) => {
  //     const newIds = [...ids];
  //     return new DeleteModals({ids: newIds});
  //   });
}
