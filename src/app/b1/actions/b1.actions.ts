import { Action } from "@ngrx/store";

export enum B1ActionTypes {
  START_EFFECTS = "[B1] Start effects",
  STOP_EFFECTS = "[B1] Stop effects",
}

export class StartEffects implements Action {
  readonly type = B1ActionTypes.START_EFFECTS;
}

export class StopEffects implements Action {
  readonly type = B1ActionTypes.STOP_EFFECTS;
}

export type B1Actions =
  StartEffects |
  StopEffects;
