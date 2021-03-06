import { Action } from '@ngrx/store';

import { ModalConfirmer } from '../../models';

export enum ModalConfirmerActionTypes {
  SHOW_MODAL_CONFIRMER = '[Modal Confirmer] Show modal',
  DISMISS_MODAL_CONFIRMER_WITH_POSITIVE_RESULT = '[Modal Confirmer] Dismiss modal with positive result',
  DISMISS_MODAL_CONFIRMER_WITH_NEGATIVE_RESULT = '[Modal Confirmer] Dismiss modal with negative result',
  DISMISS_MODAL_CONFIRMER = '[Modal Confirmer] Dismiss modal',
  CLEAN_MODAL_CONFIRMER_RESULT = '[Modal Confirmer] Clean result',
}

export class ShowModalConfirmer implements Action {
  readonly type = ModalConfirmerActionTypes.SHOW_MODAL_CONFIRMER;

  constructor(public payload: { modal: ModalConfirmer }) {
  }
}

export class DismissModalConfirmerWithPositiveResult implements Action {
  readonly type = ModalConfirmerActionTypes.DISMISS_MODAL_CONFIRMER_WITH_POSITIVE_RESULT;

  constructor(public payload: { id: string }) {
  }
}

export class DismissModalConfirmerWithNegativeResult implements Action {
  readonly type = ModalConfirmerActionTypes.DISMISS_MODAL_CONFIRMER_WITH_NEGATIVE_RESULT;

  constructor(public payload: { id: string }) {
  }
}

export class DismissModalConfirmer implements Action {
  readonly type = ModalConfirmerActionTypes.DISMISS_MODAL_CONFIRMER;

  constructor(public payload: { id: string }) {
  }
}

export class CleanModalConfirmer implements Action {
  readonly type = ModalConfirmerActionTypes.CLEAN_MODAL_CONFIRMER_RESULT;

  constructor(public payload: { id: string }) {
  }
}

export type ModalConfirmerActions =
  ShowModalConfirmer |
  DismissModalConfirmerWithPositiveResult |
  DismissModalConfirmerWithNegativeResult |
  DismissModalConfirmer |
  CleanModalConfirmer;
