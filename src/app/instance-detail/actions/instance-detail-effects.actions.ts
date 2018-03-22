import { Action } from '@ngrx/store';

export enum InstanceDetailEffectsActionTypes {
  START_EFFECTS = '[Instance detail] Start effects',
  STOP_EFFECTS = '[Instance detail] Stop effects',
}

export class StartEffects implements Action {
  readonly type = InstanceDetailEffectsActionTypes.START_EFFECTS;
}

export class StopEffects implements Action {
  readonly type = InstanceDetailEffectsActionTypes.STOP_EFFECTS;
}

export type InstanceDetailEffectsActions =
  StartEffects |
  StopEffects;
