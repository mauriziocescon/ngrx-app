import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import { empty } from "rxjs/observable/empty";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

import { DropdownService } from "../../services";
import { DropdownActionTypes, UpdateBlock } from "../../actions/blocks/dropdown.actions";
import { DropdownBlock } from "../../models";

@Injectable()
export class DropdownEffect {

  constructor(protected actions$: Actions,
              protected dropdownService: DropdownService) {
  }

  @Effect() valueDidChange$: Observable<Action> = this.actions$
    .ofType(DropdownActionTypes.UPDATE_BLOCK)
    .map((action: UpdateBlock) => action.payload)
    .switchMap((payload: { block: { id: number, changes: DropdownBlock }, notify: boolean }) => {
      if (payload.notify) {
        this.dropdownService.blockDidChange(payload.block);
      }
      return empty();
    });
}