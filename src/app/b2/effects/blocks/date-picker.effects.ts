import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, OnRunEffects, EffectNotification } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';

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

import { B2BlockType } from '../../models';

import { B2DatePickerHooksTriggerService } from '../../services';

@Injectable()
export class DatePickerEffects implements OnRunEffects {

  constructor(protected actions$: Actions,
              protected datePickerHooksTrigger: B2DatePickerHooksTriggerService) {
  }

  @Effect() blockAvailable$: Observable<Action> = this.actions$
    .ofType<FetchBlocksComplete>(ListActionTypes.FETCH_BLOCKS_COMPLETE)
    .map(action => action.payload)
    .map((blocks: Block[]) => {
      const datePickerBoxBlocks = blocks
        .filter((block: Block) => {
          return block.type === B2BlockType.DatePicker;
        })
        .map((block: Block) => {
          return { id: block.id, changes: { ...block } };
        });
      return new AddBlocks(datePickerBoxBlocks);
    });

  @Effect() clearBlocks$: Observable<Action> = this.actions$
    .ofType<ClearBlocks>(ListActionTypes.CLEAR_BLOCKS)
    .map(() => {
      return new ClearBlocks();
    });

  @Effect() valueDidChange$: Observable<Action> = this.actions$
    .ofType<UpdateBlock>(DatePickerActionTypes.UPDATE_BLOCK)
    .map(action => action.payload)
    .switchMap((payload) => {
      if (payload.triggerHooks) {
        this.datePickerHooksTrigger.blockDidChange(payload.block);
      }
      return [new SyncRequired(Date.now())];
    });

  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>): Observable<EffectNotification> {
    return this.actions$
      .ofType<StartEffects>(B2EffectsActionTypes.START_EFFECTS)
      .exhaustMap(() => {
        return resolvedEffects$.takeUntil(
          this.actions$.ofType<StopEffects>(B2EffectsActionTypes.STOP_EFFECTS));
      });
  }
}
