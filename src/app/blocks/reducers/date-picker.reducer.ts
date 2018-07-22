import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { DatePickerActionTypes, DatePickerActions } from '../actions/date-picker.actions';

import { DatePickerBlock } from '../models';

export interface State extends EntityState<DatePickerBlock> {
  datePickerBlocksLoading: { [id: string]: boolean };
}

export const adapter: EntityAdapter<DatePickerBlock> = createEntityAdapter<DatePickerBlock>({
  selectId: (block: DatePickerBlock) => block.id,
  sortComparer: (a: DatePickerBlock, b: DatePickerBlock) => {
    return a.order - b.order;
  },
});

export const initialState: State = adapter.getInitialState({
  datePickerBlocksLoading: {},
});

export function reducer(state = initialState, action: DatePickerActions): State {
  switch (action.type) {
    case DatePickerActionTypes.LOADING: {
      const newBlocksLoading = { ...state.datePickerBlocksLoading };
      newBlocksLoading[action.payload.id] = action.payload.loading;
      return {
        ...state,
        datePickerBlocksLoading: newBlocksLoading,
      };
    }
    case DatePickerActionTypes.ADD_BLOCKS: {
      return adapter.upsertMany(action.payload, state);
    }
    case DatePickerActionTypes.UPDATE_BLOCK: {
      const datePickerBlock = state.entities[action.payload.id];
      if (!datePickerBlock) {
        return state;
      }
      return adapter.updateOne(action.payload, state);
    }
    case DatePickerActionTypes.CLEAR_BLOCKS: {
      return adapter.removeAll({ ...state, datePickerBlocksLoading: {} });
    }
    default: {
      return state;
    }
  }
}

export const {
  selectIds: getDatePickerIds,
  selectEntities: getDatePickerEntities,
  selectAll: getAllDatePicker,
  selectTotal: getTotalDatePicker,
} = adapter.getSelectors();

export const getDatePickerBlocksValidity = createSelector(
  getDatePickerIds,
  getDatePickerEntities,
  (ids: string[] | number[], blocksEntities: { [id: string]: DatePickerBlock }) => {
    ids = ids as string[];
    return ids.findIndex((id: string) => {
      return blocksEntities[id].valid === false;
    }) === -1;
  },
);

export const getDatePickerBlocksLoading = (state: State) => state.datePickerBlocksLoading;
