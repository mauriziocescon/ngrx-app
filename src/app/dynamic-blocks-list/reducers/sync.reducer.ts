import { SyncActionTypes, SyncActions } from "../actions/sync.actions";

export interface State {
  requireSync: boolean;
}

const initialState: State = {
  requireSync: false,
};

export function reducer(state = initialState, action: SyncActions): State {
  switch (action.type) {
    case SyncActionTypes.REQUIRE_SYNC: {
      return {
        ...state,
        requireSync: true,
      };
    }
    case SyncActionTypes.SYNCHRONIZED: {
      return {
        ...state,
        requireSync: false,
      };
    }
    default: {
      return state;
    }
  }
}

export const isSynchronizationRequiredState = (state: State) => state.requireSync;
