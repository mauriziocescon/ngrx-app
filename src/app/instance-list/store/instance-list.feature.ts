import { createFeature, createReducer, createSelector, on } from '@ngrx/store';

import { Instance } from '../models';

import { actionGroup } from './instance-list.actions';

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

export const feature = createFeature({
  name: `ngrxApp_list`,
  reducer: createReducer(
    initialState,
    on(actionGroup.loadInstances, (state, action) => ({
      ...state,
      instances: undefined,
      loading: true,
      error: undefined,
    })),
    on(actionGroup.loadInstancesSuccess, (state, action) => ({
      ...state,
      instances: action.instances.map(instance => instance),
      loading: false,
      error: undefined,
    })),
    on(actionGroup.loadInstancesFailure, (state, action) => ({
      ...state,
      instances: undefined,
      loading: false,
      error: action.error,
    })),
  ),
  extraSelectors: ({ selectInstances, selectLoading, selectError }) => ({
    getInstances: selectInstances,
    isLoading: selectLoading,
    getError: selectError,
    getInstanceById: (id: string) => createSelector(
      selectInstances,
      instances => instances?.find(instance => instance.id === id),
    ),
  }),
});
