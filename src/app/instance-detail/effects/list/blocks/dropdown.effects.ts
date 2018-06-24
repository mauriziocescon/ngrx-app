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
  InstanceDetailEffectsActionTypes,
  StartEffects,
  StopEffects,
} from '../../../actions/instance-detail-effects.actions';
import { ListActionTypes, FetchBlocksComplete } from '../../../actions/list/list.actions';
import { SyncRequired } from '../../../actions/list/sync.actions';
import {
  DropdownActionTypes,
  AddBlocks,
  UpdateBlock,
  ClearBlocks,
} from '../../../actions/list/blocks/dropdown.actions';

import { Block, BlockType, DropdownBlock } from '../../../models';

import { DropdownHooksTriggerService } from '../../../services';

@Injectable()
export class DropdownEffect implements OnRunEffects {

  constructor(protected actions$: Actions,
              protected dropdownHooksTrigger: DropdownHooksTriggerService) {
  }

  @Effect() blockAvailable$: Observable<Action> = this.actions$
    .pipe(
      ofType<FetchBlocksComplete>(ListActionTypes.FETCH_BLOCKS_COMPLETE),
      map(action => action.payload),
      map((blocks: Block[]) => {
        const dropdownBoxBlocks = blocks
          .filter((block: Block) => {
            return block.type === BlockType.Dropdown;
          })
          .map((block: DropdownBlock) => {
            return block;
          });
        return new AddBlocks(dropdownBoxBlocks);
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
      ofType<UpdateBlock>(DropdownActionTypes.UPDATE_BLOCK),
      map(action => action.payload),
      switchMap((payload) => {
        if (payload.triggerHooks) {
          this.dropdownHooksTrigger.blockDidChange(payload.block);
        }
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
