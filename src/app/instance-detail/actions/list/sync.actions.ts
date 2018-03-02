import { Action } from "@ngrx/store";

export enum SyncActionTypes {
  SYNC_REQUIRED = "[Sync] Required to synchronize",
  SYNCHRONIZED = "[Sync] Synchronized",
}

export class SyncRequired implements Action {
  readonly type = SyncActionTypes.SYNC_REQUIRED;

  constructor(public payload: number) {
  }
}

export class Synchronized implements Action {
  readonly type = SyncActionTypes.SYNCHRONIZED;
}

export type SyncActions =
  SyncRequired |
  Synchronized;
