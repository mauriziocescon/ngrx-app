import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import { empty } from "rxjs/observable/empty";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

import { TextInputService } from "../../services";
import { TextInputActionTypes, ValueDidChange } from "../../actions/blocks/text-input.actions";
import { TextInputBlock } from "../../models";

@Injectable()
export class TextInputEffect {

  constructor(protected actions$: Actions,
              protected textInputService: TextInputService) {
  }

  @Effect() valueDidChange$: Observable<Action> = this.actions$
    .ofType(TextInputActionTypes.TEXT_INPUT_UPDATE_BLOCK)
    .map((action: ValueDidChange) => action.payload.block)
    .switchMap((block: { id: number, changes: TextInputBlock }) => {
      this.textInputService.blockDidChange(block);
      return empty();
    });
}
