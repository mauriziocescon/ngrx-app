import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { CheckBoxActionTypes, CheckBoxActions } from '../../actions/blocks/check-box.actions';

import { CheckBoxBlock } from '../../models';

export interface State extends EntityState<CheckBoxBlock> {
  idsToSync: { [id: string]: number }
}

export const adapter: EntityAdapter<CheckBoxBlock> = createEntityAdapter<CheckBoxBlock>({
  selectId: (block: CheckBoxBlock) => block.id,
  sortComparer: (a: CheckBoxBlock, b: CheckBoxBlock) => {
    return a.order - b.order;
  },
});

export const initialState: State = adapter.getInitialState({
  idsToSync: {},
});

export function reducer(state = initialState, action: CheckBoxActions): State {
  switch (action.type) {
    case CheckBoxActionTypes.ADD_BLOCK: {
      return adapter.upsertOne(action.payload.block, state);
    }
    case CheckBoxActionTypes.UPDATE_BLOCK: {
      return adapter.updateOne(action.payload.block, state);
    }
    case CheckBoxActionTypes.CLEAR_BLOCK: {
      return adapter.removeOne(action.payload.id, state);
    }
    case CheckBoxActionTypes.SYNC_REQUIRED: {
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
    case CheckBoxActionTypes.SYNCHRONIZED: {
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
  selectIds: getCheckBoxIds,
  selectEntities: getCheckBoxEntities,
  selectAll: getAllCheckBox,
  selectTotal: getTotalCheckBox,
} = adapter.getSelectors();
