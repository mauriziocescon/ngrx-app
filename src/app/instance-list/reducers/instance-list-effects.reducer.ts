import { InstanceListEffectsActionTypes, InstanceListEffectsActions } from '../actions/instance-list-effects.actions';

export interface State {
  active: boolean;
}

const initialState: State = {
  active: false,
};

export function reducer(state = initialState, action: InstanceListEffectsActions): State {
  switch (action.type) {
    case InstanceListEffectsActionTypes.START_EFFECTS: {
      return {
        ...state,
        active: true,
      };
    }
    case InstanceListEffectsActionTypes.STOP_EFFECTS: {
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
