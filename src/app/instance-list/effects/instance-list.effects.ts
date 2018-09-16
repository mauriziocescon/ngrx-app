import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType, OnRunEffects, EffectNotification } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  map,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import {
  InstanceListActionTypes,
  FetchInstances,
  FetchInstancesComplete,
  FetchInstancesError,
} from '../actions/instance-list.actions';
import { InstanceListEffectsActionTypes, StartEffects, StopEffects } from '../actions/instance-list-effects.actions';

import { Instance } from '../models';

import { InstanceListService } from '../services';

@Injectable()
export class InstanceListEffects implements OnRunEffects {

  constructor(protected actions$: Actions,
              protected instanceList: InstanceListService) {
  }

  @Effect() fetchBlocks$: Observable<Action> = this.actions$
    .pipe(
      ofType<FetchInstances>(InstanceListActionTypes.FETCH_INSTANCES),
      map(action => action.payload),
      switchMap((params) => {
        return this.instanceList.getInstances(params.textSearch)
          .pipe(
            switchMap((instances: Instance[]) => {
              return [new FetchInstancesComplete({ instances })];
            }),
            catchError(error => of(new FetchInstancesError({ error }))),
          );
      }),
    );

  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>): Observable<EffectNotification> {
    return this.actions$
      .pipe(
        ofType<StartEffects>(InstanceListEffectsActionTypes.START_EFFECTS),
        exhaustMap(() =>
          resolvedEffects$.pipe(
            takeUntil(this.actions$.pipe(ofType<StopEffects>(InstanceListEffectsActionTypes.STOP_EFFECTS))),
          ),
        ),
      );
  }
}
