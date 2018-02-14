import { HomeActionTypes, HomeActions } from "../actions/home.actions";
import { Instance } from "../models";

export interface State {
  fetchedInstances: Instance[];
  fetchLoading: boolean;
  fetchError: string;
}

const initialState: State = {
  fetchedInstances: [],
  fetchLoading: false,
  fetchError: undefined,
};

export function reducer(state = initialState, action: HomeActions): State {
  switch (action.type) {
    case HomeActionTypes.FETCH_INSTANCES: {
      return {
        ...state,
        fetchedInstances: undefined,
        fetchLoading: true,
        fetchError: undefined,
      };
    }
    case HomeActionTypes.FETCH_INSTANCES_COMPLETE: {
      return {
        ...state,
        fetchedInstances: action.payload.map(blocks => blocks),
        fetchLoading: false,
        fetchError: undefined,
      };
    }
    case HomeActionTypes.FETCH_INSTANCES_ERROR: {
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

export const getFetchedInstancesState = (state: State) => state.fetchedInstances;
export const getFetchLoadingState = (state: State) => state.fetchLoading;
export const getFetchErrorState = (state: State) => state.fetchError;
