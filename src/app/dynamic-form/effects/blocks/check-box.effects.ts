import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import { empty } from "rxjs/observable/empty";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

import { CheckBoxService } from "../../services";
import { CheckBoxActionTypes, ValueDidChange } from "../../actions/blocks/check-box.actions";
import { CheckBoxBlock } from "../../models";

@Injectable()
export class CheckBoxEffect {

  constructor(protected actions$: Actions,
              protected checkBoxService: CheckBoxService) {
  }

  @Effect() valueDidChange$: Observable<Action> = this.actions$
    .ofType(CheckBoxActionTypes.CHECK_BOX_UPDATE_BLOCK)
    .map((action: ValueDidChange) => action.payload.block)
    .switchMap((block: { id: number, changes: CheckBoxBlock }) => {
      this.checkBoxService.blockDidChange(block);
      return empty();
    });
}
