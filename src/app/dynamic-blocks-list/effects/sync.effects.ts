import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/switchMap";

import { UpdateBlocks } from "../actions/list.actions";
import { SyncActionTypes, SyncRequired } from "../actions/sync.actions";

@Injectable()
export class SyncEffects {

  constructor(protected actions$: Actions) {
  }

  @Effect() synchronization$: Observable<Action> = this.actions$
    .ofType(SyncActionTypes.SYNC_REQUIRED)
    .map((action: SyncRequired) => action.payload)
    .switchMap((payload) => {
      return [new UpdateBlocks(payload)];
    });
}
