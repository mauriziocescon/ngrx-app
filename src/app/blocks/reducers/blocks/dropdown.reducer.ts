import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { DropdownActionTypes, DropdownActions } from '../../actions/blocks/dropdown.actions';

import { DropdownBlock } from '../../models';

export interface State extends EntityState<DropdownBlock> {
  idsToSync: { [id: string]: number },
}

export const adapter: EntityAdapter<DropdownBlock> = createEntityAdapter<DropdownBlock>({
  selectId: (block: DropdownBlock) => block.id,
  sortComparer: (a: DropdownBlock, b: DropdownBlock) => {
    return a.order - b.order;
  },
});

export const initialState: State = adapter.getInitialState({
  idsToSync: {},
});

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
    case DropdownActionTypes.SYNC_REQUIRED: {
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
    case DropdownActionTypes.SYNCHRONIZED: {
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
  selectIds: getDropdownIds,
  selectEntities: getDropdownEntities,
  selectAll: getAllDropdown,
  selectTotal: getTotalDropdown,
} = adapter.getSelectors();

export const getIdsToSync = (state: State) => state.idsToSync;
