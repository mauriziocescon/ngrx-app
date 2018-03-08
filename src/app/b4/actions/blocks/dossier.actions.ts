import { Action } from "@ngrx/store";
import { Update } from "@ngrx/entity";

import { DossierBlock } from "../../models";

export enum DossierActionTypes {
  LOADING = "[DossierBlock] Loading",
  ADD_BLOCKS = "[DossierBlock] Add blocks",
  UPDATE_BLOCK = "[DossierBlock] Update block",
  CLEAR_BLOCKS = "[DossierBlock] Clear blocks",
}

export class Loading implements Action {
  readonly type = DossierActionTypes.LOADING;

  constructor(public payload: { id: string, loading: boolean }) {
  }
}

export class AddBlocks implements Action {
  readonly type = DossierActionTypes.ADD_BLOCKS;

  constructor(public payload: Update<DossierBlock>[]) {
  }
}

export class UpdateBlock implements Action {
  readonly type = DossierActionTypes.UPDATE_BLOCK;

  constructor(public payload: { block: Update<DossierBlock>, triggerHooks: boolean }) {
  }
}

export class ClearBlocks implements Action {
  readonly type = DossierActionTypes.CLEAR_BLOCKS;
}

export type DossierActions =
  Loading |
  AddBlocks |
  UpdateBlock |
  ClearBlocks;
