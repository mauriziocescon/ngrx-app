import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

import { BlocksListService } from "../services/list.service";
import * as block from "../actions/list.action";
import { Block } from "../models/block.model";

@Injectable()
export class ListEffects {

  constructor(private update$: Actions,
              private blocksListService: BlocksListService) {
  }

  @Effect()
  fetchBlocks$: Observable<Action> = this.update$
    .ofType(block.FETCH_BLOCKS)
    .debounceTime(400)
    // .map(action => action.payload)
    .switchMap(() => this.blocksListService.getBlocks())
    .map((blocks: Block[]) => new block.FetchBlocksComplete(blocks))
    .catch(err => of(new block.FetchBlocksError(err)));
}
