import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType, EffectNotification, OnRunEffects } from '@ngrx/effects';

import { Observable } from 'rxjs';
import {
  exhaustMap,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import {
  InstanceDetailEffectsActionTypes,
  StartEffects,
  StopEffects,
} from '../../../instance-detail/actions/instance-detail-effects.actions';
import { SyncRequired } from '../../../instance-detail/actions/list/sync.actions';
import {
  TextInputActionTypes,
  UpdateBlock,
} from '../../actions/blocks/text-input.actions';

@Injectable()
export class TextInputEffect implements OnRunEffects {

  constructor(protected actions$: Actions) {
  }

  @Effect() valueDidChange$: Observable<Action> = this.actions$
    .pipe(
      ofType<UpdateBlock>(TextInputActionTypes.UPDATE_BLOCK),
      switchMap(() => {
        return [new SyncRequired(Date.now())];
      }),
    );

  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>): Observable<EffectNotification> {
    return this.actions$
      .pipe(
        ofType<StartEffects>(InstanceDetailEffectsActionTypes.START_EFFECTS),
        exhaustMap(() =>
          resolvedEffects$.pipe(
            takeUntil(this.actions$.pipe(ofType<StopEffects>(InstanceDetailEffectsActionTypes.STOP_EFFECTS))),
          ),
        ),
      );
  }
}
