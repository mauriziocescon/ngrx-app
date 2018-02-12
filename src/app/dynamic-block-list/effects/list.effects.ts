import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { from } from "rxjs/observable/from";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/switchMap";

import { BlockListService } from "../services";
import {
  ListActionTypes,
  FetchBlocks,
  FetchBlocksComplete,
  FetchBlocksError,
  UpdateBlocks,
  UpdateBlocksComplete,
  UpdateBlocksError,
} from "../actions/list.actions";
import { Synchronized } from "../actions/sync.actions";

import { Block } from "../models";

@Injectable()
export class ListEffects {

  constructor(protected actions$: Actions,
              protected blocksList: BlockListService) {
  }

  @Effect() fetchBlocks$: Observable<Action> = this.actions$
    .ofType(ListActionTypes.FETCH_BLOCKS)
    .debounceTime(400)
    .map((action: FetchBlocks) => action.payload)
    .switchMap((params) => {
      return this.blocksList.getBlocks(params.module, params.instance, params.step)
        .mergeMap((blocks: Block[]) => {
          return [new FetchBlocksComplete(blocks)];
        })
        .catch(err => of(new FetchBlocksError(err)));
    });

  @Effect() updateBlocks$: Observable<Action> = this.actions$
    .ofType(ListActionTypes.UPDATE_BLOCKS)
    .debounceTime(400)
    .map((action: UpdateBlocks) => action.payload)
    .switchMap((payload) => {
      return this.blocksList.updateBlocks(payload.module, payload.instance, payload.step, payload.blocks)
        .mergeMap((result: boolean) => {
          return [
            new UpdateBlocksComplete(),
            new Synchronized(),
          ];
        })
        .catch(err => from([
          new UpdateBlocksError(err),
          new Synchronized(),
        ]));
    });
}