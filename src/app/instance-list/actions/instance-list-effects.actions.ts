import { Action } from "@ngrx/store";

export enum InstanceListEffectsActionTypes {
  START_EFFECTS = "[Instance list] Start effects",
  STOP_EFFECTS = "[Instance list] Stop effects",
}

export class StartEffects implements Action {
  readonly type = InstanceListEffectsActionTypes.START_EFFECTS;
}

export class StopEffects implements Action {
  readonly type = InstanceListEffectsActionTypes.STOP_EFFECTS;
}

export type InstanceListEffectsActions =
  StartEffects |
  StopEffects;
