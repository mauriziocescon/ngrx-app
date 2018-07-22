import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType, OnRunEffects, EffectNotification } from '@ngrx/effects';

import { Observable } from 'rxjs';
import {
  exhaustMap,
  map,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import {
  Block,
  FetchBlocksComplete,
  ListActionTypes,
  SyncRequired,
} from '../../instance-detail/instance-detail.module';

import { B1EffectsActionTypes, StartEffects, StopEffects } from '../../actions/b1-effects.actions';
import {
  CheckBoxConfirmerActionTypes,
  AddBlocks,
  UpdateBlock,
  ClearBlocks,
} from '../../actions/blocks/check-box-confirmer.actions';

import { B1BlockType, CheckBoxConfirmerBlock } from '../../models';

@Injectable()
export class CheckBoxConfirmerEffects implements OnRunEffects {

  constructor(protected actions$: Actions) {
  }

  @Effect() blockAvailable$: Observable<Action> = this.actions$
    .pipe(
      ofType<FetchBlocksComplete>(ListActionTypes.FETCH_BLOCKS_COMPLETE),
      map(action => action.payload),
      map((blocks: Block[]) => {
        const checkBoxConfirmerBoxBlocks = blocks
          .filter((block: Block) => {
            return block.type === B1BlockType.CheckBoxConfirmer;
          })
          .map((block: CheckBoxConfirmerBlock) => {
            return block;
          });
        return new AddBlocks(checkBoxConfirmerBoxBlocks);
      }),
    );

  @Effect() clearBlocks$: Observable<Action> = this.actions$
    .pipe(
      ofType<ClearBlocks>(ListActionTypes.CLEAR_BLOCKS),
      map(() => {
        return new ClearBlocks();
      }),
    );

  @Effect() valueDidChange$: Observable<Action> = this.actions$
    .pipe(
      ofType<UpdateBlock>(CheckBoxConfirmerActionTypes.UPDATE_BLOCK),
      switchMap(() => {
        return [new SyncRequired(Date.now())];
      }),
    );

  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>): Observable<EffectNotification> {
    return this.actions$
      .pipe(
        ofType<StartEffects>(B1EffectsActionTypes.START_EFFECTS),
        exhaustMap(() =>
          resolvedEffects$.pipe(
            takeUntil(this.actions$.pipe(ofType<StopEffects>(B1EffectsActionTypes.STOP_EFFECTS))),
          ),
        ),
      );
  }
}
