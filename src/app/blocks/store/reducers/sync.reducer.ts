import { SyncActionTypes, SyncActions } from '../actions/sync.actions';

export interface State {
  syncRequired: boolean;
  timestamp: number | undefined;
}

const initialState: State = {
  syncRequired: false,
  timestamp: undefined,
};

export function reducer(state = initialState, action: SyncActions): State {
  switch (action.type) {
    case SyncActionTypes.SYNC_REQUIRED: {
      return {
        ...state,
        syncRequired: true,
        timestamp: action.payload,
      };
    }
    case SyncActionTypes.SYNCHRONIZED: {
      return {
        ...state,
        syncRequired: false,
        timestamp: undefined,
      };
    }
    default: {
      return state;
    }
  }
}

export const isSynchronizationRequired = (state: State) => state.syncRequired;
export const isSynchronizationRequiredWithTimestamp = (state: State) => state;
