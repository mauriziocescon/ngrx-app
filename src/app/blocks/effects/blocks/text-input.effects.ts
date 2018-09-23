import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import {
  TextInputActionTypes,
  UpdateBlock,
  SyncRequired,
} from '../../actions/blocks/text-input.actions';

@Injectable()
export class TextInputEffect {

  constructor(protected actions$: Actions) {
  }

  @Effect() valueDidChange$: Observable<Action> = this.actions$
    .pipe(
      ofType<UpdateBlock>(TextInputActionTypes.UPDATE_BLOCK),
      map(action => action.payload),
      switchMap((params) => {
        const payload = { id: params.block.id.toString(), timestamp: Date.now() };
        return [new SyncRequired(payload)];
      }),
    );
}
