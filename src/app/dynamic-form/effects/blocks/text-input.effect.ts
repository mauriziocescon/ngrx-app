import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import { empty } from "rxjs/observable/empty";
import "rxjs/add/operator/switchMap";

import { TextInputService } from "../../services/blocks/text-input.service";
import { TextInputActionTypes } from "../../actions/blocks/text-input.actions";

@Injectable()
export class TextInputEffect {

  constructor(private update$: Actions,
              private textInputService: TextInputService) {
  }

  @Effect() valueDidChange$: Observable<Action> = this.update$
    .ofType(TextInputActionTypes.TEXT_INPUT_UPDATE_BLOCK)
    .switchMap(() => {
      return empty();

      // do something with the service
      // return this.textInputService.getBlocks()
    });
}
