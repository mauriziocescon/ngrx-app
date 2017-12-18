import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import "rxjs/operator/map";
import "rxjs/operator/debounceTime";
import "rxjs/operator/switchMap";
import "rxjs/add/operator/catch";

import { BlocksListService } from "../services/list.service";
import * as block from "../actions/list.action";
import { Block } from "../models";

@Injectable()
export class ListEffects {

  constructor(private update$: Actions,
              private blocksListService: BlocksListService) {
  }

  @Effect() fetchBlocks$: Observable<Action> = this.update$
    .ofType(block.FETCH_BLOCKS)
    .debounceTime(400)
    // .map(action => action.payload)
    .switchMap(() => {
      return this.blocksListService.getBlocks()
        .map((blocks: Block[]) => {
          return new block.FetchBlocksComplete(blocks);
        })
        .catch(err => of(new block.FetchBlocksError(err)));
    });
}
