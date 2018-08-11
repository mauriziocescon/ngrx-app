import { InstanceListActionTypes, InstanceListActions } from '../actions/instance-list.actions';
import { Instance } from '../models';

export interface State {
  params: { textSearch: string };
  fetchedInstances: Instance[] | undefined;
  fetchLoading: boolean;
  fetchError: string | undefined;
}

const initialState: State = {
  params: { textSearch: '' },
  fetchedInstances: [],
  fetchLoading: false,
  fetchError: undefined,
};

export function reducer(state = initialState, action: InstanceListActions): State {
  switch (action.type) {
    case InstanceListActionTypes.FETCH_INSTANCES: {
      return {
        ...state,
        fetchedInstances: undefined,
        fetchLoading: true,
        fetchError: undefined,
      };
    }
    case InstanceListActionTypes.FETCH_INSTANCES_COMPLETE: {
      return {
        ...state,
        fetchedInstances: action.payload.map(blocks => blocks),
        fetchLoading: false,
        fetchError: undefined,
      };
    }
    case InstanceListActionTypes.FETCH_INSTANCES_ERROR: {
      return {
        ...state,
        fetchedInstances: undefined,
        fetchLoading: false,
        fetchError: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export const getFetchedInstances = (state: State) => state.fetchedInstances;
export const getFetchLoading = (state: State) => state.fetchLoading;
export const getFetchError = (state: State) => state.fetchError;
