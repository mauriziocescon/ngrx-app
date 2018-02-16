import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { from } from "rxjs/observable/from";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

import { BlockListService } from "../../services";
import {
  ListActionTypes,
  FetchBlocks,
  FetchBlocksComplete,
  FetchBlocksError,
  UpdateBlocks,
  UpdateBlocksComplete,
  UpdateBlocksError,
} from "../../actions/list/list.actions";
import { Synchronized } from "../../actions/list/sync.actions";

import { Block } from "../../models";

@Injectable()
export class ListEffects {

  constructor(protected actions$: Actions,
              protected blockList: BlockListService) {
  }

  @Effect() fetchBlocks$: Observable<Action> = this.actions$
    .ofType(ListActionTypes.FETCH_BLOCKS)
    .debounceTime(400)
    .map((action: FetchBlocks) => action.payload)
    .switchMap((params) => {
      return this.blockList.getBlocks(params.module, params.instance, params.step)
        .switchMap((blocks: Block[]) => {
          return [new FetchBlocksComplete(blocks)];
        })
        .catch(err => of(new FetchBlocksError(err)));
    });

  @Effect() updateBlocks$: Observable<Action> = this.actions$
    .ofType(ListActionTypes.UPDATE_BLOCKS)
    .debounceTime(5000)
    .map((action: UpdateBlocks) => action.payload)
    .switchMap((payload) => {
      return this.blockList.updateBlocks(payload.module, payload.instance, payload.step, payload.blocks)
        .switchMap((result: boolean) => {
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
