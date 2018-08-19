import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { SyncRequired } from '../../actions/sync.actions';
import {
  CheckBoxActionTypes,
  UpdateBlock,
} from '../../actions/blocks/check-box.actions';

@Injectable()
export class CheckBoxEffect {

  constructor(protected actions$: Actions) {
  }

  @Effect() valueDidChange$: Observable<Action> = this.actions$
    .pipe(
      ofType<UpdateBlock>(CheckBoxActionTypes.UPDATE_BLOCK),
      switchMap(() => {
        return [new SyncRequired(Date.now())];
      }),
    );
}
