import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { DatePickerActionTypes, DatePickerActions } from '../../actions/blocks/date-picker.actions';

import { DatePickerBlock } from '../../models';

export interface State extends EntityState<DatePickerBlock> {
  idsToSync: { [id: string]: number }
}

export const adapter: EntityAdapter<DatePickerBlock> = createEntityAdapter<DatePickerBlock>({
  selectId: (block: DatePickerBlock) => block.id,
  sortComparer: (a: DatePickerBlock, b: DatePickerBlock) => {
    return a.order - b.order;
  },
});

export const initialState: State = adapter.getInitialState({
  idsToSync: {},
});

export function reducer(state = initialState, action: DatePickerActions): State {
  switch (action.type) {
    case DatePickerActionTypes.ADD_BLOCK: {
      return adapter.upsertOne(action.payload.block, state);
    }
    case DatePickerActionTypes.UPDATE_BLOCK: {
      return adapter.updateOne(action.payload.block, state);
    }
    case DatePickerActionTypes.CLEAR_BLOCK: {
      return adapter.removeOne(action.payload.id, state);
    }
    case DatePickerActionTypes.SYNC_REQUIRED: {
      const id = action.payload.id;
      const timestamp = action.payload.timestamp;
      return {
        ...state,
        idsToSync: {
          ...state.idsToSync,
          [id]: timestamp,
        }
      };
    }
    case DatePickerActionTypes.SYNCHRONIZED: {
      const id = action.payload.id;
      return {
        ...state,
        idsToSync: {
          ...state.idsToSync,
          [id]: undefined,
        }
      };
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

export const getIdsToSync = (state: State) => state.idsToSync;
