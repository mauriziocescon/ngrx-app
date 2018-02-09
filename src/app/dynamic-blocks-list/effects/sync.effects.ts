import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/withLatestFrom";

import { UpdateBlocks } from "../actions/list.actions";
import { SyncActionTypes } from "../actions/sync.actions";

import { BlocksSyncService } from "../services";

@Injectable()
export class SyncEffects {

  constructor(protected actions$: Actions,
              protected syncService: BlocksSyncService) {
  }

  @Effect() synchronization$: Observable<Action> = this.actions$
    .ofType(SyncActionTypes.REQUIRE_SYNC)
    .withLatestFrom(this.syncService.helperFunction())
    .switchMap(([payload, blocks]) => {
      return [new UpdateBlocks(this.syncService.payloadFunction(blocks))];
    });
}
