import { Action } from "@ngrx/store";

export enum InstanceDetailActionTypes {
  START_EFFECTS = "[Instance detail] Start effects",
  STOP_EFFECTS = "[Instance detail] Stop effects",
}

export class StartEffects implements Action {
  readonly type = InstanceDetailActionTypes.START_EFFECTS;
}

export class StopEffects implements Action {
  readonly type = InstanceDetailActionTypes.STOP_EFFECTS;
}

export type InstanceDetailActions =
  StartEffects |
  StopEffects;
