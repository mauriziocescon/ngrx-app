import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import { empty } from "rxjs/observable/empty";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

import { TextInputConfirmerService } from "../../services";
import { TextInputConfirmerActionTypes, UpdateBlock } from "../../actions/blocks/text-input-confirmer.actions";
import { TextInputConfirmerBlock } from "../../models";

@Injectable()
export class TextInputConfirmerEffect {

  constructor(protected actions$: Actions,
              protected textInputConfirmerService: TextInputConfirmerService) {
  }

  @Effect() valueDidChange$: Observable<Action> = this.actions$
    .ofType(TextInputConfirmerActionTypes.UPDATE_BLOCK)
    .map((action: UpdateBlock) => action.payload)
    .switchMap((payload: { block: { id: number, changes: TextInputConfirmerBlock }, notify: boolean }) => {
      if (payload.notify) {
        this.textInputConfirmerService.blockDidChange(payload.block);
      }
      return empty();
    });
}
