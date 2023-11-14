import { inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { UIUtilitiesService } from '../services/ui-utilities.service';

import { actionGroup } from './core.actions';

export const showModalAlert$ = createEffect(
  (
    actions$ = inject(Actions),
    uiUtilities = inject(UIUtilitiesService),
  ) => {
    return actions$
      .pipe(
        ofType(actionGroup.showModalAlert),
        switchMap(data => from(uiUtilities.modalAlert(data.modal))),
      );
  },
  { functional: true },
);

export const showModalConfirmer$ = createEffect(
  (
    actions$ = inject(Actions),
    uiUtilities = inject(UIUtilitiesService),
  ) => {
    return actions$
      .pipe(
        ofType(actionGroup.showModalConfirmer),
        switchMap(data => from(uiUtilities.modalConfirmer(data.modal))),
      );
  },
  { functional: true },
);
