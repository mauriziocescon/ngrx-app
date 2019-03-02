import {
  InstanceDetailEffectsActionTypes,
  InstanceDetailEffectsActions,
} from '../store/actions/instance-detail-effects.actions';

export interface State {
  active: boolean;
}

const initialState: State = {
  active: false,
};

export function reducer(state = initialState, action: InstanceDetailEffectsActions): State {
  switch (action.type) {
    case InstanceDetailEffectsActionTypes.START_EFFECTS: {
      return {
        ...state,
        active: true,
      };
    }
    case InstanceDetailEffectsActionTypes.STOP_EFFECTS: {
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

export const areEffectsRunning = (state: State) => state.active;
