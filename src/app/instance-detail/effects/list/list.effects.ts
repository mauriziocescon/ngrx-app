import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions, EffectNotification, OnRunEffects } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { from } from "rxjs/observable/from";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/exhaustMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/takeUntil";

import { InstanceDetailEffectsActionTypes, StartEffects, StopEffects } from "../../actions/instance-detail-effects.actions";
import {
  ListActionTypes,
  FetchBlocks,
  FetchBlocksComplete,
  FetchBlocksError,
  SyncBlocks,
  SyncBlocksComplete,
  SyncBlocksError,
} from "../../actions/list/list.actions";
import { Synchronized } from "../../actions/list/sync.actions";

import { Block } from "../../models";

import { BlockListService } from "../../services";

@Injectable()
export class ListEffects implements OnRunEffects {

  constructor(protected actions$: Actions,
              protected blockList: BlockListService) {
  }

  @Effect() fetchBlocks$: Observable<Action> = this.actions$
    .ofType<FetchBlocks>(ListActionTypes.FETCH_BLOCKS)
    .debounceTime(400)
    .map(action => action.payload)
    .switchMap((params) => {
      return this.blockList.getBlocks(params.module, params.instance, params.step)
        .switchMap((blocks: Block[]) => {
          return [new FetchBlocksComplete(blocks)];
        })
        .catch(err => of(new FetchBlocksError(err)));
    });

  @Effect() updateBlocks$: Observable<Action> = this.actions$
    .ofType<SyncBlocks>(ListActionTypes.SYNC_BLOCKS)
    .debounceTime(3000)
    .map(action => action.payload)
    .switchMap((payload) => {
      return this.blockList.updateBlocks(payload.module, payload.instance, payload.step, payload.blocks)
        .switchMap((blocks: Block[]) => {
          return [
            new SyncBlocksComplete(),
            new Synchronized(),
          ];
        })
        .catch(err => from([
          new SyncBlocksError(err),
          new Synchronized(),
        ]));
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
