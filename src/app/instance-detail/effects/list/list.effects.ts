import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType, EffectNotification, OnRunEffects } from '@ngrx/effects';

import { Observable, of, from } from 'rxjs';
import {
  catchError,
  debounceTime,
  exhaustMap,
  map,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import {
  InstanceDetailEffectsActionTypes,
  StartEffects,
  StopEffects,
} from '../../actions/instance-detail-effects.actions';
import {
  ListActionTypes,
  FetchBlocks,
  FetchBlocksComplete,
  FetchBlocksError,
  SyncBlocks,
  SyncBlocksComplete,
  SyncBlocksError,
} from '../../actions/list/list.actions';
import { Synchronized } from '../../actions/list/sync.actions';

import { Block } from '../../models';

import { BlockListService } from '../../services';

@Injectable()
export class ListEffects implements OnRunEffects {

  constructor(protected actions$: Actions,
              protected blockList: BlockListService) {
  }

  @Effect() fetchBlocks$: Observable<Action> = this.actions$
    .pipe(
      ofType<FetchBlocks>(ListActionTypes.FETCH_BLOCKS),
      map(action => action.payload),
      switchMap((params) => {
        return this.blockList.getBlocks(params.instance)
          .pipe(
            switchMap((blocks: Block[]) => {
              return [new FetchBlocksComplete(blocks)];
            }),
            catchError(err => of(new FetchBlocksError(err))),
          );
      }),
    );

  @Effect() syncBlocks$: Observable<Action> = this.actions$
    .pipe(
      ofType<SyncBlocks>(ListActionTypes.SYNC_BLOCKS),
      debounceTime(3000),
      map(action => action.payload),
      switchMap((payload) => {
        return this.blockList.syncBlocks(payload.instance, payload.blocks)
          .pipe(
            switchMap((blocks: Block[]) => {
              return [
                new SyncBlocksComplete(),
                new Synchronized(),
                new FetchBlocksComplete(blocks),
              ];
            }),
            catchError(err => from([
              new SyncBlocksError(err),
              new Synchronized(),
            ])),
          );
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
