import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { of, from } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  switchMap,
} from 'rxjs/operators';

import { Block } from '../../../shared';

import {
  BlockListActionTypes,
  LoadBlocks,
  LoadBlocksSuccess,
  LoadBlocksFailure,
  UpdateBlock,
  SyncBlocks,
  SyncBlocksSuccess,
  SyncBlocksFailure,
} from '../actions/block-list.actions';

import {
  SyncActionTypes,
  SyncRequired,
  Synchronized,
} from '../actions/sync.actions';

import { BlockListService } from '../services/block-list.service';

@Injectable()
export class BlockListEffects {

  loadBlocks$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType<LoadBlocks>(BlockListActionTypes.LOAD_BLOCKS),
        map(action => action.payload),
        switchMap((params) => {
          return this.blockList.getBlocks(params.instanceId)
            .pipe(
              switchMap((blocks: Block[]) => {
                return [new LoadBlocksSuccess({ blocks })];
              }),
              catchError(error => of(new LoadBlocksFailure({ error }))),
            );
        }),
      );
  });
  syncRequired$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType<UpdateBlock>(BlockListActionTypes.UPDATE_BLOCK),
        map(() => new SyncRequired(Date.now())),
      );
  });
  syncBlocks$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType<SyncBlocks>(BlockListActionTypes.SYNC_BLOCKS),
        debounceTime(3000),
        map(action => action.payload),
        switchMap((payload) => {
          return this.blockList.syncBlocks(payload.instanceId, payload.blocks)
            .pipe(
              switchMap((blocks: Block[]) => {
                return [
                  new SyncBlocksSuccess(),
                  new Synchronized(),
                  new LoadBlocksSuccess({ blocks }),
                ];
              }),
              catchError(error => from([
                new SyncBlocksFailure({ error }),
                new Synchronized(),
              ])),
            );
        }),
      );
  });

  constructor(protected actions$: Actions,
              protected blockList: BlockListService) {
  }
}
