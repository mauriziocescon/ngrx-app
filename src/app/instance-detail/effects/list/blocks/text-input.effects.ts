import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType, EffectNotification, OnRunEffects } from '@ngrx/effects';

import { Observable } from 'rxjs';
import {
  exhaustMap,
  map,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import {
  InstanceDetailEffectsActionTypes,
  StartEffects,
  StopEffects,
} from '../../../actions/instance-detail-effects.actions';
import { ListActionTypes, FetchBlocksComplete } from '../../../actions/list/list.actions';
import { SyncRequired } from '../../../actions/list/sync.actions';
import {
  TextInputActionTypes,
  AddBlocks,
  UpdateBlock,
  ClearBlocks,
} from '../../../actions/list/blocks/text-input.actions';

import { Block, BlockType, TextInputBlock } from '../../../models';

@Injectable()
export class TextInputEffect implements OnRunEffects {

  constructor(protected actions$: Actions) {
  }

  @Effect() blockAvailable$: Observable<Action> = this.actions$
    .pipe(
      ofType<FetchBlocksComplete>(ListActionTypes.FETCH_BLOCKS_COMPLETE),
      map(action => action.payload),
      map((blocks: Block[]) => {
        const textInputBoxBlocks = blocks
          .filter((block: Block) => {
            return block.type === BlockType.TextInput;
          })
          .map((block: TextInputBlock) => {
            return block;
          });
        return new AddBlocks(textInputBoxBlocks);
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
      ofType<UpdateBlock>(TextInputActionTypes.UPDATE_BLOCK),
      switchMap(() => {
        return [new SyncRequired(Date.now())];
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
