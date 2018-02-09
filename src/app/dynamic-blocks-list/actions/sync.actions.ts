import { Action } from "@ngrx/store";

export enum SyncActionTypes {
  SYNC_REQUIRED = "[Sync] Required to synchronize",
  SYNCHRONIZED = "[Sync] Synchronized",
}

export class SyncRequired implements Action {
  readonly type = SyncActionTypes.SYNC_REQUIRED;
}

export class Synchronized implements Action {
  readonly type = SyncActionTypes.SYNCHRONIZED;
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type SyncActions =
  SyncRequired |
  Synchronized;
