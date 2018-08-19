import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { TextInputActionTypes, TextInputActions } from '../../actions/blocks/text-input.actions';

import { TextInputBlock } from '../../models/index';

export interface State extends EntityState<TextInputBlock> {
}

export const adapter: EntityAdapter<TextInputBlock> = createEntityAdapter<TextInputBlock>({
  selectId: (block: TextInputBlock) => block.id,
  sortComparer: (a: TextInputBlock, b: TextInputBlock) => {
    return a.order - b.order;
  },
});

export const initialState: State = adapter.getInitialState({});

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
