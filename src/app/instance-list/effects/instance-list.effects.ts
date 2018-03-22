import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, OnRunEffects, EffectNotification } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';

import {
  InstanceListActionTypes,
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
    .ofType(InstanceListActionTypes.FETCH_INSTANCES)
    .debounceTime(400)
    .switchMap(() => {
      return this.instanceList.getInstances()
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
