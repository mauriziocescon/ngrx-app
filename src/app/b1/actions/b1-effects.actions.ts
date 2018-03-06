import { Action } from "@ngrx/store";

export enum B1EffectsActionTypes {
  START_EFFECTS = "[B1] Start effects",
  STOP_EFFECTS = "[B1] Stop effects",
}

export class StartEffects implements Action {
  readonly type = B1EffectsActionTypes.START_EFFECTS;
}

export class StopEffects implements Action {
  readonly type = B1EffectsActionTypes.STOP_EFFECTS;
}

export type B1EffectsActions =
  StartEffects |
  StopEffects;
