import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, OnRunEffects, EffectNotification } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';

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
    .ofType<FetchInstances>(InstanceListActionTypes.FETCH_INSTANCES)
    .map(action => action.payload)
    .switchMap((params) => {
      return this.instanceList.getInstances(params.textSearch)
        .switchMap((instances: Instance[]) => {
          return [new FetchInstancesComplete(instances)];
        })
        .catch(err => of(new FetchInstancesError(err)));
    });

  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>): Observable<EffectNotification> {
    return this.actions$
      .ofType<StartEffects>(InstanceListEffectsActionTypes.START_EFFECTS)
      .exhaustMap(() => {
        return resolvedEffects$.takeUntil(
          this.actions$.ofType<StopEffects>(InstanceListEffectsActionTypes.STOP_EFFECTS));
      });
  }
}
