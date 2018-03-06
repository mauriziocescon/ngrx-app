import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions, EffectNotification, OnRunEffects } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/exhaustMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/takeUntil";

import { InstanceDetailActionTypes, StartEffects, StopEffects } from "../../../actions/instance-detail.actions";
import { ListActionTypes, FetchBlocksComplete } from "../../../actions/list/list.actions";
import { SyncRequired } from "../../../actions/list/sync.actions";
import {
  TextInputActionTypes,
  AddBlocks,
  UpdateBlock,
  ClearBlocks,
} from "../../../actions/list/blocks/text-input.actions";

import { Block, BlockType } from "../../../models";
import { TextInputActionsService } from "../../../services";

@Injectable()
export class TextInputEffect implements OnRunEffects {

  constructor(protected actions$: Actions,
              protected textInputActions: TextInputActionsService) {
  }

  @Effect() blockAvailable$: Observable<Action> = this.actions$
    .ofType<FetchBlocksComplete>(ListActionTypes.FETCH_BLOCKS_COMPLETE)
    .map(action => action.payload)
    .map((blocks: Block[]) => {
      const textInputBoxBlocks = blocks
        .filter((block: Block) => {
          return block.type === BlockType.TextInput;
        })
        .map((block: Block) => {
          return {id: block.id, changes: {...block}};
        });
      return new AddBlocks(textInputBoxBlocks);
    });

  @Effect() clearBlocks$: Observable<Action> = this.actions$
    .ofType<ClearBlocks>(ListActionTypes.CLEAR_BLOCKS)
    .map(() => {
      return new ClearBlocks();
    });

  @Effect() valueDidChange$: Observable<Action> = this.actions$
    .ofType<UpdateBlock>(TextInputActionTypes.UPDATE_BLOCK)
    .map(action => action.payload)
    .switchMap((payload) => {
      if (payload.notify) {
        this.textInputActions.blockDidChange(payload.block);
      }
      return [new SyncRequired(Date.now())];
    });

  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>): Observable<EffectNotification> {
    return this.actions$
      .ofType<StartEffects>(InstanceDetailActionTypes.START_EFFECTS)
      .exhaustMap(() => {
        return resolvedEffects$.takeUntil(
          this.actions$.ofType<StopEffects>(InstanceDetailActionTypes.STOP_EFFECTS));
      });
  }
}
