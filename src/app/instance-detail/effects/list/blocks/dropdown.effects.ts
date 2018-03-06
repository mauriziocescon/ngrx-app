import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions, OnRunEffects, EffectNotification } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/exhaustMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/takeUntil";

import { InstanceDetailEffectsActionTypes, StartEffects, StopEffects } from "../../../actions/instance-detail-effects.actions";
import { ListActionTypes, FetchBlocksComplete } from "../../../actions/list/list.actions";
import { SyncRequired } from "../../../actions/list/sync.actions";
import {
  DropdownActionTypes,
  AddBlocks,
  UpdateBlock,
  ClearBlocks,
} from "../../../actions/list/blocks/dropdown.actions";

import { Block, BlockType } from "../../../models";

import { DropdownActionsService } from "../../../services";

@Injectable()
export class DropdownEffect implements OnRunEffects {

  constructor(protected actions$: Actions,
              protected dropdownActions: DropdownActionsService) {
  }

  @Effect() blockAvailable$: Observable<Action> = this.actions$
    .ofType<FetchBlocksComplete>(ListActionTypes.FETCH_BLOCKS_COMPLETE)
    .map(action => action.payload)
    .map((blocks: Block[]) => {
      const dropdownBoxBlocks = blocks
        .filter((block: Block) => {
          return block.type === BlockType.Dropdown;
        })
        .map((block: Block) => {
          return {id: block.id, changes: {...block}};
        });
      return new AddBlocks(dropdownBoxBlocks);
    });

  @Effect() clearBlocks$: Observable<Action> = this.actions$
    .ofType<ClearBlocks>(ListActionTypes.CLEAR_BLOCKS)
    .map(() => {
      return new ClearBlocks();
    });

  @Effect() valueDidChange$: Observable<Action> = this.actions$
    .ofType<UpdateBlock>(DropdownActionTypes.UPDATE_BLOCK)
    .map(action => action.payload)
    .switchMap((payload) => {
      if (payload.notify) {
        this.dropdownActions.blockDidChange(payload.block);
      }
      return [new SyncRequired(Date.now())];
    });

  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>): Observable<EffectNotification> {
    return this.actions$
      .ofType<StartEffects>(InstanceDetailEffectsActionTypes.START_EFFECTS)
      .exhaustMap(() => {
        return resolvedEffects$.takeUntil(
          this.actions$.ofType<StopEffects>(InstanceDetailEffectsActionTypes.STOP_EFFECTS));
      });
  }
}
