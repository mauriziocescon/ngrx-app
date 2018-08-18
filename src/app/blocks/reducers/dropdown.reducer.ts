import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { DropdownActionTypes, DropdownActions } from '../actions/blocks/dropdown.actions';

import { DropdownBlock } from '../models';

export interface State extends EntityState<DropdownBlock> {
}

export const adapter: EntityAdapter<DropdownBlock> = createEntityAdapter<DropdownBlock>({
  selectId: (block: DropdownBlock) => block.id,
  sortComparer: (a: DropdownBlock, b: DropdownBlock) => {
    return a.order - b.order;
  },
});

export const initialState: State = adapter.getInitialState({});

export function reducer(state = initialState, action: DropdownActions): State {
  switch (action.type) {
    case DropdownActionTypes.ADD_BLOCK: {
      return adapter.upsertOne(action.payload.block, state);
    }
    case DropdownActionTypes.UPDATE_BLOCK: {
      return adapter.updateOne(action.payload.block, state);
    }
    case DropdownActionTypes.CLEAR_BLOCK: {
      return adapter.removeOne(action.payload.id, state);
    }
    default: {
      return state;
    }
  }
}

export const {
  selectIds: getDropdownIds,
  selectEntities: getDropdownEntities,
  selectAll: getAllDropdown,
  selectTotal: getTotalDropdown,
} = adapter.getSelectors();
