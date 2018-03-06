import { Action } from "@ngrx/store";

export enum B2ActionTypes {
  START_EFFECTS = "[B2] Start effects",
  STOP_EFFECTS = "[B2] Stop effects",
}

export class StartEffects implements Action {
  readonly type = B2ActionTypes.START_EFFECTS;
}

export class StopEffects implements Action {
  readonly type = B2ActionTypes.STOP_EFFECTS;
}

export type B2Actions =
  StartEffects |
  StopEffects;
