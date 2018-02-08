import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/switchMap";

import { UpdateBlocks } from "../actions/list.actions";
import { SynchActionTypes } from "../actions/synch.actions";

import { BlockListService } from "../services";

@Injectable()
export class SynchEffects {

  constructor(protected actions$: Actions,
              protected route: ActivatedRoute,
              protected blocksList: BlockListService,) {
  }

  @Effect() synchronization: Observable<Action> = this.actions$
    .ofType(SynchActionTypes.REQUIRE_SYNCH)
    .withLatestFrom(this.helperFunction())
    .switchMap(([payload, blocks]) => {
      return [new UpdateBlocks(this.payloadFunction(blocks))];
    });


  helperFunction(): any {
    const params = this.getUpdateBlocksInstanceSelector();
    return this.blocksList.getAllEditBlocksSelector(params.module, params.instance, params.step);
  }

  payloadFunction(blocks): any {
    return {
      ...this.getUpdateBlocksInstanceSelector(),
      blocks: blocks,
    };
  }

  getUpdateBlocksInstanceSelector(): { module: string, instance: string, step: string } {
    const module = this.route.snapshot.paramMap.get("module");
    const instance = this.route.snapshot.paramMap.get("instance");
    const step = this.route.snapshot.paramMap.get("step");

    return {
      module: module,
      instance: instance,
      step: step,
    };
  }
}
