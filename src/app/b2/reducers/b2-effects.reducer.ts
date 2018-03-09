import { B2EffectsActionTypes, B2EffectsActions } from "../actions/b2-effects.actions";

export interface State {
  active: boolean;
}

const initialState: State = {
  active: false,
};

export function reducer(state = initialState, action: B2EffectsActions): State {
  switch (action.type) {
    case B2EffectsActionTypes.START_EFFECTS: {
      return {
        ...state,
        active: true,
      };
    }
    case B2EffectsActionTypes.STOP_EFFECTS: {
      return {
        ...state,
        active: false,
      };
    }
    default: {
      return state;
    }
  }
}

export const areEffectsRunningState = (state: State) => state.active;
