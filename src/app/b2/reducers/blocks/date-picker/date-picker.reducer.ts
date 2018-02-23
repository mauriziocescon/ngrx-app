import { createSelector } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

import { DatePickerActionTypes, DatePickerActions } from "../../../actions/blocks/date-picker.actions";
import { DatePickerBlock } from "../../../models";

export interface State extends EntityState<DatePickerBlock> {
  datePickerBlocksLoading: {[id: string]: boolean};
}

export const adapter: EntityAdapter<DatePickerBlock> = createEntityAdapter<DatePickerBlock>({
  selectId: (block: DatePickerBlock) => block.id,
  sortComparer: (a: DatePickerBlock, b: DatePickerBlock) => {
    return a.id - b.id;
  },
});

export const initialState: State = adapter.getInitialState({
  datePickerBlocksLoading: {},
});

export function reducer(state = initialState, action: DatePickerActions): State {
  switch (action.type) {
    case DatePickerActionTypes.LOADING: {
      const newBlocksLoading = {...state.datePickerBlocksLoading};
      newBlocksLoading[action.payload.id] = action.payload.loading;
      return {
        ...state,
        datePickerBlocksLoading: newBlocksLoading,
      };
    }
    case DatePickerActionTypes.ADD_BLOCKS: {
      return {
        ...adapter.upsertMany(action.payload, state),
      };
    }
    case DatePickerActionTypes.UPDATE_BLOCK: {
      const datePickerBlock = state.entities[action.payload.block.id];
      if (!datePickerBlock) {
        return state;
      }
      return {
        ...adapter.updateOne(action.payload.block, state),
      };
    }
    case DatePickerActionTypes.CLEAR_BLOCKS: {
      return adapter.removeAll({...state, datePickerBlocksLoading: {}});
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

export const getDatePickerBlocksValidityState = createSelector(
  getDatePickerIds,
  getDatePickerEntities,
  (ids: number[], blocksEntities: {[id: string]: any}) => {
    return ids.findIndex((id: number) => {
      return blocksEntities[id].valid === false;
    }) === -1;
  }
);

export const getDatePickerBlocksLoadingState = (state: State) => state.datePickerBlocksLoading;
