import { B1EffectsActionTypes, B1EffectsActions } from '../actions/b1-effects.actions';

export interface State {
  active: boolean;
}

const initialState: State = {
  active: false,
};

export function reducer(state = initialState, action: B1EffectsActions): State {
  switch (action.type) {
    case B1EffectsActionTypes.START_EFFECTS: {
      return {
        ...state,
        active: true,
      };
    }
    case B1EffectsActionTypes.STOP_EFFECTS: {
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
