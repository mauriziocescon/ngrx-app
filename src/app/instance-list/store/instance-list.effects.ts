import { inject, Injectable } from '@angular/core';
import { createEffect, Actions, ofType, OnRunEffects, EffectNotification } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import { InstanceListService } from './instance-list.service';

import { actionGroup } from './instance-list.actions';

@Injectable()
export class InstanceListEffects implements OnRunEffects {
  actions$ = inject(Actions);
  instanceList = inject(InstanceListService);

  loadInstances$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(actionGroup.loadInstances),
        switchMap(params => {
          return this.instanceList.getInstances(params.textSearch)
            .pipe(
              switchMap(instances => [
                actionGroup.loadInstancesSuccess({ instances }),
              ]),
              catchError(error => of(actionGroup.loadInstancesFailure({ error }))),
            );
        }),
      );
  });

  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>): Observable<EffectNotification> {
    return this.actions$
      .pipe(
        ofType(actionGroup.startEffects),
        exhaustMap(() => resolvedEffects$
          .pipe(takeUntil(this.actions$.pipe(ofType(actionGroup.stopEffects))))),
      );
  }
}
