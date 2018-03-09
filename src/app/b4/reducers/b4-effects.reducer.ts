import { B4EffectsActionTypes, B4EffectsActions } from "../actions/b4-effects.actions";

export interface State {
  active: boolean;
}

const initialState: State = {
  active: false,
};

export function reducer(state = initialState, action: B4EffectsActions): State {
  switch (action.type) {
    case B4EffectsActionTypes.START_EFFECTS: {
      return {
        ...state,
        active: true,
      };
    }
    case B4EffectsActionTypes.STOP_EFFECTS: {
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
