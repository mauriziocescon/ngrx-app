import { Action } from '@ngrx/store';

export enum B4EffectsActionTypes {
  START_EFFECTS = '[B4] Start effects',
  STOP_EFFECTS = '[B4] Stop effects',
}

export class StartEffects implements Action {
  readonly type = B4EffectsActionTypes.START_EFFECTS;
}

export class StopEffects implements Action {
  readonly type = B4EffectsActionTypes.STOP_EFFECTS;
}

export type B4EffectsActions =
  StartEffects |
  StopEffects;
