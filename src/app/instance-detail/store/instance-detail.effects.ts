import { inject, Injectable } from '@angular/core';
import { createEffect, Actions, ofType, OnRunEffects, EffectNotification } from '@ngrx/effects';

import { of, from, Observable } from 'rxjs';
import {
  catchError,
  debounceTime,
  exhaustMap,
  map,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import { InstanceDetailService } from './instance-detail.service';

import { actionGroup } from './instance-detail.actions';

@Injectable()
export class InstanceDetailEffects implements OnRunEffects {
  actions$ = inject(Actions);
  instanceDetail = inject(InstanceDetailService);

  syncRequired$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(actionGroup.updateBlock),
        map(() => actionGroup.syncRequired({ timestamp: Date.now() })),
      );
  });

  loadBlocks$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(actionGroup.loadBlocks),
        switchMap(params => {
          return this.instanceDetail.getBlocks(params.instanceId)
            .pipe(
              switchMap(blocks => [
                actionGroup.loadBlocksSuccess({ blocks }),
              ]),
              catchError(error => of(actionGroup.loadBlocksFailure({ error }))),
            );
        }),
      );
  });

  syncBlocks$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(actionGroup.syncBlocks),
        debounceTime(3000),
        switchMap(payload => {
          return this.instanceDetail.syncBlocks(payload.instanceId, payload.blocks)
            .pipe(
              switchMap(blocks => [
                actionGroup.syncBlocksSuccess(),
                actionGroup.synchronized(),
                actionGroup.loadBlocksSuccess({ blocks }),
              ]),
              catchError(error => from([
                actionGroup.syncBlocksFailure({ error }),
                actionGroup.synchronized(),
              ])),
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
