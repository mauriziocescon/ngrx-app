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

import { BlockListService } from "../services";
import { ListActionTypes, FetchBlocksComplete, FetchBlocksError } from "../actions/list.actions";

import { Block } from "../models";

@Injectable()
export class ListEffects {

  constructor(protected update$: Actions,
              protected blocksList: BlockListService) {
  }

  @Effect() fetchBlocks$: Observable<Action> = this.update$
    .ofType(ListActionTypes.FETCH_BLOCKS)
    .debounceTime(400)
    .switchMap(() => {
      return this.blocksList.getBlocks()
        .mergeMap((blocks: Block[]) => {
          return [
            new FetchBlocksComplete(blocks),
          ];
        })
        .catch(err => of(new FetchBlocksError(err)));
    });
}
