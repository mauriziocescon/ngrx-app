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

import { B4EffectsActionTypes, StartEffects, StopEffects } from "../../actions/b4-effects.actions";
import {
  DossierActionTypes,
  AddBlocks,
  UpdateBlock,
  ClearBlocks
} from "../../actions/blocks/dossier.actions";

import { B4BlockType } from "../../models";

import { B4DossierHooksTriggerService } from "../../services";

@Injectable()
export class DossierEffects implements OnRunEffects {

  constructor(protected actions$: Actions,
              protected dossierHooksTrigger: B4DossierHooksTriggerService) {
  }

  @Effect() blockAvailable$: Observable<Action> = this.actions$
    .ofType<FetchBlocksComplete>(ListActionTypes.FETCH_BLOCKS_COMPLETE)
    .map(action => action.payload)
    .map((blocks: Block[]) => {
      const dossierBoxBlocks = blocks
        .filter((block: Block) => {
          return block.type === B4BlockType.Dossier;
        })
        .map((block: Block) => {
          return {id: block.id, changes: {...block}};
        });
      return new AddBlocks(dossierBoxBlocks);
    });

  @Effect() clearBlocks$: Observable<Action> = this.actions$
    .ofType<ClearBlocks>(ListActionTypes.CLEAR_BLOCKS)
    .map(() => {
      return new ClearBlocks();
    });

  @Effect() valueDidChange$: Observable<Action> = this.actions$
    .ofType<UpdateBlock>(DossierActionTypes.UPDATE_BLOCK)
    .map(action => action.payload)
    .switchMap((payload) => {
      if (payload.triggerHooks) {
        this.dossierHooksTrigger.blockDidChange(payload.block);
      }
      return [new SyncRequired(Date.now())];
    });

  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>): Observable<EffectNotification> {
    return this.actions$
      .ofType<StartEffects>(B4EffectsActionTypes.START_EFFECTS)
      .exhaustMap(() => {
        return resolvedEffects$.takeUntil(
          this.actions$.ofType<StopEffects>(B4EffectsActionTypes.STOP_EFFECTS));
      });
  }

}
