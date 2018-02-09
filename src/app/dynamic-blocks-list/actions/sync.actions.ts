import { Action } from "@ngrx/store";

export enum SyncActionTypes {
  REQUIRE_SYNC = "[Sync] Required to synchronize",
  SYNCHRONIZED = "[Sync] Synchronized",
}

export class RequireSync implements Action {
  readonly type = SyncActionTypes.REQUIRE_SYNC;
}

export class Synchronized implements Action {
  readonly type = SyncActionTypes.SYNCHRONIZED;
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type SyncActions =
  RequireSync |
  Synchronized;
