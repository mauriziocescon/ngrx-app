import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { TextInputActionTypes, TextInputActions } from '../../actions/blocks/text-input.actions';

import { TextInputBlock } from '../../../models';

export interface State extends EntityState<TextInputBlock> {
  idsToSync: { [id: string]: number }
}

export const adapter: EntityAdapter<TextInputBlock> = createEntityAdapter<TextInputBlock>({
  selectId: (block: TextInputBlock) => block.id,
  sortComparer: (a: TextInputBlock, b: TextInputBlock) => {
    return a.order - b.order;
  },
});

export const initialState: State = adapter.getInitialState({
  idsToSync: {},
});

export function reducer(state = initialState, action: TextInputActions): State {
  switch (action.type) {
    case TextInputActionTypes.ADD_BLOCK: {
      return adapter.upsertOne(action.payload.block, state);
    }
    case TextInputActionTypes.UPDATE_BLOCK: {
      return adapter.updateOne(action.payload.block, state);
    }
    case TextInputActionTypes.CLEAR_BLOCK: {
      return adapter.removeOne(action.payload.id, state);
    }
    case TextInputActionTypes.SYNC_REQUIRED: {
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
    case TextInputActionTypes.SYNCHRONIZED: {
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
  selectIds: getTextInputIds,
  selectEntities: getTextInputEntities,
  selectAll: getAllTextInput,
  selectTotal: getTotalTextInput,
} = adapter.getSelectors();

export const getIdsToSync = (state: State) => state.idsToSync;
