import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions, OnRunEffects, EffectNotification } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/exhaustMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/takeUntil";

import {
  Block,
  FetchBlocksComplete,
  ListActionTypes,
  SyncRequired,
} from "../../../instance-detail/instance-detail.module";

import { B1EffectsActionTypes, StartEffects, StopEffects } from "../../actions/b1-effects.actions";
import {
  CheckBoxConfirmerActionTypes,
  AddBlocks,
  UpdateBlock,
  ClearBlocks
} from "../../actions/blocks/check-box-confirmer.actions";

import { B1BlockType } from "../../models";

import { B1CheckBoxConfirmerActionsService } from "../../services";

@Injectable()
export class CheckBoxConfirmerEffects implements OnRunEffects {

  constructor(protected actions$: Actions,
              protected checkBoxConfirmerActions: B1CheckBoxConfirmerActionsService) {
  }

  @Effect() blockAvailable$: Observable<Action> = this.actions$
    .ofType<FetchBlocksComplete>(ListActionTypes.FETCH_BLOCKS_COMPLETE)
    .map(action => action.payload)
    .map((blocks: Block[]) => {
      const checkBoxConfirmerBoxBlocks = blocks
        .filter((block: Block) => {
          return block.type === B1BlockType.CheckBoxConfirmer;
        })
        .map((block: Block) => {
          return {id: block.id, changes: {...block}};
        });
      return new AddBlocks(checkBoxConfirmerBoxBlocks);
    });

  @Effect() clearBlocks$: Observable<Action> = this.actions$
    .ofType<ClearBlocks>(ListActionTypes.CLEAR_BLOCKS)
    .map(() => {
      return new ClearBlocks();
    });

  @Effect() valueDidChange$: Observable<Action> = this.actions$
    .ofType<UpdateBlock>(CheckBoxConfirmerActionTypes.UPDATE_BLOCK)
    .map(action => action.payload)
    .switchMap((payload) => {
      if (payload.notify) {
        this.checkBoxConfirmerActions.blockDidChange(payload.block);
      }
      return [new SyncRequired(Date.now())];
    });

  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>): Observable<EffectNotification> {
    return this.actions$
      .ofType<StartEffects>(B1EffectsActionTypes.START_EFFECTS)
      .exhaustMap(() => {
        return resolvedEffects$.takeUntil(
          this.actions$.ofType<StopEffects>(B1EffectsActionTypes.STOP_EFFECTS));
      });
  }
}
