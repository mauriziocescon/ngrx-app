import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import { empty } from "rxjs/observable/empty";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

import { DropdownService } from "../../services/blocks/dropdown.service";
import { DropdownActionTypes, ValueDidChange } from "../../actions/blocks/dropdown.actions";
import { DropdownBlock } from "../../models";

@Injectable()
export class DropdownEffect {

  constructor(private update$: Actions,
              private dropdownService: DropdownService) {
  }

  @Effect() valueDidChange$: Observable<Action> = this.update$
    .ofType(DropdownActionTypes.DROPDOWN_UPDATE_BLOCK)
    .map((action: ValueDidChange) => action.payload.block)
    .switchMap((block: { id: number, changes: DropdownBlock }) => {
      this.dropdownService.valueDidChange(block);
      return empty();
    });
}
