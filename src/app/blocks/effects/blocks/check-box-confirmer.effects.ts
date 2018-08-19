import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { SyncRequired } from '../../actions/sync.actions';
import {
  CheckBoxConfirmerActionTypes,
  UpdateBlock,
} from '../../actions/blocks/check-box-confirmer.actions';

@Injectable()
export class CheckBoxConfirmerEffects {

  constructor(protected actions$: Actions) {
  }

  @Effect() valueDidChange$: Observable<Action> = this.actions$
    .pipe(
      ofType<UpdateBlock>(CheckBoxConfirmerActionTypes.UPDATE_BLOCK),
      switchMap(() => {
        return [new SyncRequired(Date.now())];
      }),
    );
}
