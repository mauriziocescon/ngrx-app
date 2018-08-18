import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType, OnRunEffects, EffectNotification } from '@ngrx/effects';

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
} from '../../instance-detail/actions/instance-detail-effects.actions';
import { SyncRequired } from '../../instance-detail/actions/list/sync.actions';
import {
  DatePickerActionTypes,
  UpdateBlock,
} from '../actions/blocks/date-picker.actions';

@Injectable()
export class DatePickerEffects implements OnRunEffects {

  constructor(protected actions$: Actions) {
  }

  @Effect() valueDidChange$: Observable<Action> = this.actions$
    .pipe(
      ofType<UpdateBlock>(DatePickerActionTypes.UPDATE_BLOCK),
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
