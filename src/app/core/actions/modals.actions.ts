import { Action } from "@ngrx/store";

import { Modal } from "../models";

export enum ModalsActionTypes {
  ADD_MODAL = "[Modals] Add modal",
  UPDATE_MODAL = "[Modals] Update modal",
  DELETE_MODAL = "[Modals] Delete modal",
  DELETE_MODALS = "[Modals] Delete modals",
}

export class AddModal implements Action {
  readonly type = ModalsActionTypes.ADD_MODAL;

  constructor(public payload: { modal: Modal }) {
  }
}

export class UpdateModal implements Action {
  readonly type = ModalsActionTypes.UPDATE_MODAL;

  constructor(public payload: { modal: { id: string, changes: Modal } }) {
  }
}

export class DeleteModal implements Action {
  readonly type = ModalsActionTypes.DELETE_MODAL;

  constructor(public payload: { id: string }) {
  }
}

export class DeleteModals implements Action {
  readonly type = ModalsActionTypes.DELETE_MODALS;

  constructor(public payload: { ids: string[] }) {
  }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ModalsActions =
  AddModal |
  UpdateModal |
  DeleteModal |
  DeleteModals;
