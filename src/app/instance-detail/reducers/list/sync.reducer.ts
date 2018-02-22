import { SyncActionTypes, SyncActions } from "../../actions/list/sync.actions";

export interface State {
  syncRequired: boolean;
  timestamp: number;
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

export const isSynchronizationRequiredState = (state: State) => state.syncRequired;
export const isSynchronizationRequiredWithTimestampState = (state: State) => state;