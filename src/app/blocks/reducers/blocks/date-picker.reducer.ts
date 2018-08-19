import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { DatePickerActionTypes, DatePickerActions } from '../../actions/blocks/date-picker.actions';

import { DatePickerBlock } from '../../models/index';

export interface State extends EntityState<DatePickerBlock> {
}

export const adapter: EntityAdapter<DatePickerBlock> = createEntityAdapter<DatePickerBlock>({
  selectId: (block: DatePickerBlock) => block.id,
  sortComparer: (a: DatePickerBlock, b: DatePickerBlock) => {
    return a.order - b.order;
  },
});

export const initialState: State = adapter.getInitialState({});

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
