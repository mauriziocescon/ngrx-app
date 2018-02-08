import { SynchActionTypes, SynchActions } from "../actions/synch.actions";

export interface State {
  requireSynch: boolean;
}

const initialState: State = {
  requireSynch: false,
};

export function reducer(state = initialState, action: SynchActions): State {
  switch (action.type) {
    case SynchActionTypes.REQUIRE_SYNCH: {
      return {
        ...state,
        requireSynch: true,
      };
    }
    case SynchActionTypes.SYNCHRONIZED: {
      return {
        ...state,
        requireSynch: false,
      };
    }
    default: {
      return state;
    }
  }
}

export const isSynchronizationRequiredState = (state: State) => state.requireSynch;
