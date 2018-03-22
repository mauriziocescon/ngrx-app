import { Action } from '@ngrx/store';

export enum B2EffectsActionTypes {
  START_EFFECTS = '[B2] Start effects',
  STOP_EFFECTS = '[B2] Stop effects',
}

export class StartEffects implements Action {
  readonly type = B2EffectsActionTypes.START_EFFECTS;
}

export class StopEffects implements Action {
  readonly type = B2EffectsActionTypes.STOP_EFFECTS;
}

export type B2EffectsActions =
  StartEffects |
  StopEffects;
