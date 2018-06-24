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
} from '../../../instance-detail/instance-detail.module';

import { B2EffectsActionTypes, StartEffects, StopEffects } from '../../actions/b2-effects.actions';
import {
  DatePickerActionTypes,
  AddBlocks,
  UpdateBlock,
  ClearBlocks,
} from '../../actions/blocks/date-picker.actions';

import { B2BlockType, DatePickerBlock } from '../../models';

import { B2DatePickerHooksTriggerService } from '../../services';

@Injectable()
export class DatePickerEffects implements OnRunEffects {

  constructor(protected actions$: Actions,
              protected datePickerHooksTrigger: B2DatePickerHooksTriggerService) {
  }

  @Effect() blockAvailable$: Observable<Action> = this.actions$
    .pipe(
      ofType<FetchBlocksComplete>(ListActionTypes.FETCH_BLOCKS_COMPLETE),
      map(action => action.payload),
      map((blocks: Block[]) => {
        const datePickerBoxBlocks = blocks
          .filter((block: Block) => {
            return block.type === B2BlockType.DatePicker;
          })
          .map((block: DatePickerBlock) => {
            return block;
          });
        return new AddBlocks(datePickerBoxBlocks);
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
      ofType<UpdateBlock>(DatePickerActionTypes.UPDATE_BLOCK),
      map(action => action.payload),
      switchMap((payload) => {
        if (payload.triggerHooks) {
          this.datePickerHooksTrigger.blockDidChange(payload.block);
        }
        return [new SyncRequired(Date.now())];
      }),
    );

  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>): Observable<EffectNotification> {
    return this.actions$
      .pipe(
        ofType<StartEffects>(B2EffectsActionTypes.START_EFFECTS),
        exhaustMap(() =>
          resolvedEffects$.pipe(
            takeUntil(this.actions$.pipe(ofType<StopEffects>(B2EffectsActionTypes.STOP_EFFECTS))),
          ),
        ),
      );
  }
}
