import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/switchMap";

import { BlocksListService } from "../services/list.service";
import { AddBlocks } from "../actions/edit-blocks.actions";
import { ListActionTypes, FetchBlocksComplete, FetchBlocksError } from "../actions/list.actions";
import { Block } from "../models";

@Injectable()
export class ListEffects {

  constructor(private update$: Actions,
              private blocksListService: BlocksListService) {
  }

  @Effect() fetchBlocks$: Observable<Action> = this.update$
    .ofType(ListActionTypes.FETCH_BLOCKS)
    .debounceTime(400)
    // .map(action => action.payload)
    .switchMap(() => {
      return this.blocksListService.getBlocks()
        .mergeMap((blocks: Block[]) => {
          return [
            new FetchBlocksComplete(blocks),
            new AddBlocks({blocks: blocks}),
          ];
        })
        .catch(err => of(new FetchBlocksError(err)));
    });
}
