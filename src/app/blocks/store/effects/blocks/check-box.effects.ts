import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import {
  CheckBoxActionTypes,
  UpdateBlock,
  SyncRequired,
} from '../../actions/blocks/check-box.actions';

@Injectable()
export class CheckBoxEffect {

  constructor(protected actions$: Actions) {
  }

  @Effect() valueDidChange$: Observable<Action> = this.actions$
    .pipe(
      ofType<UpdateBlock>(CheckBoxActionTypes.UPDATE_BLOCK),
      map(action => action.payload),
      switchMap((params) => {
        const payload = { id: params.block.id.toString(), timestamp: Date.now() };
        return [new SyncRequired(payload)];
      }),
    );
}
