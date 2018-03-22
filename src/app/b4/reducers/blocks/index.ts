import { ActionReducerMap } from '@ngrx/store';

import * as fromDossier from './dossier/dossier.reducer';

export interface State {
  dossier: fromDossier.State;
}

export const reducers: ActionReducerMap<State, any> = {
  dossier: fromDossier.reducer,
};

export const getDossierState = (state: State) => state.dossier;
