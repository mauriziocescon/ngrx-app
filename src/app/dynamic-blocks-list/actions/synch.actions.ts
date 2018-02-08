import { Action } from "@ngrx/store";

export enum SynchActionTypes {
  REQUIRE_SYNCH = "[Synch] Require to synchronize",
  SYNCHRONIZED = "[Synch] Synchronized",
}

export class RequireSynch implements Action {
  readonly type = SynchActionTypes.REQUIRE_SYNCH;
}

export class Synchronized implements Action {
  readonly type = SynchActionTypes.SYNCHRONIZED;
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type SynchActions =
  RequireSynch |
  Synchronized;
