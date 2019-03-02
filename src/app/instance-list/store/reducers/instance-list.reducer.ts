import { InstanceListActionTypes, InstanceListActions } from '../actions/instance-list.actions';
import { Instance } from '../../models';

export interface State {
  params: { textSearch: string };
  instances: Instance[] | undefined;
  loading: boolean;
  error: string | undefined;
}

const initialState: State = {
  params: { textSearch: '' },
  instances: [],
  loading: false,
  error: undefined,
};

export function reducer(state = initialState, action: InstanceListActions): State {
  switch (action.type) {
    case InstanceListActionTypes.LOAD_INSTANCES: {
      return {
        ...state,
        instances: undefined,
        loading: true,
        error: undefined,
      };
    }
    case InstanceListActionTypes.LOAD_INSTANCES_SUCCESS: {
      return {
        ...state,
        instances: action.payload.instances.map(instance => instance),
        loading: false,
        error: undefined,
      };
    }
    case InstanceListActionTypes.LOAD_INSTANCES_FAILURE: {
      return {
        ...state,
        instances: undefined,
        loading: false,
        error: action.payload.error,
      };
    }
    default: {
      return state;
    }
  }
}

export const getInstances = (state: State) => state.instances;
export const isLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
