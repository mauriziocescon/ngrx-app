import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { SyncRequired } from '../../actions/sync.actions';
import {
  DatePickerActionTypes,
  UpdateBlock,
} from '../../actions/blocks/date-picker.actions';

@Injectable()
export class DatePickerEffects {

  constructor(protected actions$: Actions) {
  }

  @Effect() valueDidChange$: Observable<Action> = this.actions$
    .pipe(
      ofType<UpdateBlock>(DatePickerActionTypes.UPDATE_BLOCK),
      switchMap(() => {
        return [new SyncRequired(Date.now())];
      }),
    );
}
