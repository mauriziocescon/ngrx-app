import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

import * as fromRoot from '../../../reducers';
import * as fromBlockList from './block-list.reducer';
import * as fromSync from './sync.reducer';

export interface BlocksState {
  blockList: fromBlockList.State;
  sync: fromSync.State;
}

export interface State extends fromRoot.State {
  blocks: BlocksState;
}

// -----------------
// ------------ AOT
export const TOKEN = new InjectionToken<ActionReducerMap<BlocksState>>('BlocksReducers');

export function getReducers(): ActionReducerMap<BlocksState, any> {
  return {
    blockList: fromBlockList.reducer,
    sync: fromSync.reducer,
  };
}

export const reducerProvider = [
  { provide: TOKEN, useFactory: getReducers },
];
