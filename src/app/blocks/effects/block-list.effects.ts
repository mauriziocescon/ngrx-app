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
  FetchBlocksComplete,
  FetchBlocksError,
  SyncBlocks,
  SyncBlocksComplete,
  SyncBlocksError,
} from '../actions/block-list.actions';
import { Synchronized } from '../actions/sync.actions';

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
              return [new FetchBlocksComplete({ blocks })];
            }),
            catchError(error => of(new FetchBlocksError({ error }))),
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
                new SyncBlocksComplete(),
                new Synchronized(),
                new FetchBlocksComplete({ blocks }),
              ];
            }),
            catchError(error => from([
              new SyncBlocksError({ error }),
              new Synchronized(),
            ])),
          );
      }),
    );
}
