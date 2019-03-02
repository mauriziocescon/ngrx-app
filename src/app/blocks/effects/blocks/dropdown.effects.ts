import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import {
  DropdownActionTypes,
  UpdateBlock,
  SyncRequired,
} from '../../actions/blocks/dropdown.actions';

@Injectable()
export class DropdownEffect {

  constructor(protected actions$: Actions) {
  }

  @Effect() valueDidChange$: Observable<Action> = this.actions$
    .pipe(
      ofType<UpdateBlock>(DropdownActionTypes.UPDATE_BLOCK),
      map(action => action.payload),
      switchMap((params) => {
        const payload = { id: params.block.id.toString(), timestamp: Date.now() };
        return [new SyncRequired(payload)];
      }),
    );
}