import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { Observable, of, from } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  switchMap,
} from 'rxjs/operators';

import { Block } from '../../shared/shared.module';

import {
  BlockListActionTypes,
  FetchBlocks,
  FetchBlocksSuccess,
  FetchBlocksFailure,
  SyncBlocks,
  SyncBlocksSuccess,
  SyncBlocksFailure,
} from '../actions/block-list.actions';

import { BlockListService } from '../services';

@Injectable()
export class BlockListEffects {

  constructor(protected actions$: Actions,
              protected blockList: BlockListService) {
  }

  @Effect() fetchBlocks$: Observable<Action> = this.actions$
    .pipe(
      ofType<FetchBlocks>(BlockListActionTypes.FETCH_BLOCKS),
      map(action => action.payload),
      switchMap((params) => {
        return this.blockList.getBlocks(params.instance)
          .pipe(
            switchMap((blocks: Block[]) => {
              return [new FetchBlocksSuccess({ blocks })];
            }),
            catchError(error => of(new FetchBlocksFailure({ error }))),
          );
      }),
    );

  @Effect() syncBlocks$: Observable<Action> = this.actions$
    .pipe(
      ofType<SyncBlocks>(BlockListActionTypes.SYNC_BLOCKS),
      debounceTime(3000),
      map(action => action.payload),
      switchMap((payload) => {
        return this.blockList.syncBlocks(payload.instance, payload.blocks)
          .pipe(
            switchMap((blocks: Block[]) => {
              return [
                new SyncBlocksSuccess(),
                new FetchBlocksSuccess({ blocks }),
              ];
            }),
            catchError(error => from([
              new SyncBlocksFailure({ error }),
            ])),
          );
      }),
    );
}
