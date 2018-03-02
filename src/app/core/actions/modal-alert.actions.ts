import { Action } from "@ngrx/store";

import { ModalAlert } from "../models";

export enum ModalAlertActionTypes {
  SHOW_MODAL_ALERT = "[Modal Alert] Show modal",
  DISMISS_MODAL_ALERT = "[Modal Alert] Dismiss modal",
}

export class ShowModalAlert implements Action {
  readonly type = ModalAlertActionTypes.SHOW_MODAL_ALERT;

  constructor(public payload: { modal: ModalAlert }) {
  }
}

export class DismissModalAlert implements Action {
  readonly type = ModalAlertActionTypes.DISMISS_MODAL_ALERT;

  constructor(public payload: { id: string }) {
  }
}

export type ModalAlertActions =
  ShowModalAlert |
  DismissModalAlert;
