import { createSelector } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

import { TextInputActionTypes, TextInputActions } from "../../../../actions/list/blocks/text-input.actions";
import { TextInputBlock } from "../../../../models";

export interface State extends EntityState<TextInputBlock> {
  textInputBlocksLoading: {[id: string]: boolean};
}

export const adapter: EntityAdapter<TextInputBlock> = createEntityAdapter<TextInputBlock>({
  selectId: (block: TextInputBlock) => block.id,
  sortComparer: (a: TextInputBlock, b: TextInputBlock) => {
    return a.order - b.order;
  },
});

export const initialState: State = adapter.getInitialState({
  textInputBlocksLoading: {},
});

export function reducer(state = initialState, action: TextInputActions): State {
  switch (action.type) {
    case TextInputActionTypes.LOADING: {
      const newBlocksLoading = {...state.textInputBlocksLoading};
      newBlocksLoading[action.payload.id] = action.payload.loading;
      return {
        ...state,
        textInputBlocksLoading: newBlocksLoading,
      };
    }
    case TextInputActionTypes.ADD_BLOCKS: {
      return {
        ...adapter.upsertMany(action.payload, state),
      };
    }
    case TextInputActionTypes.UPDATE_BLOCK: {
      const textInputBlock = state.entities[action.payload.block.id];
      if (!textInputBlock) {
        return state;
      }
      return {
        ...adapter.updateOne(action.payload.block, state),
      };
    }
    case TextInputActionTypes.CLEAR_BLOCKS: {
      return adapter.removeAll({...state, textInputBlocksLoading: {}});
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

export const getTextInputBlocksValidityState = createSelector(
  getTextInputIds,
  getTextInputEntities,
  (ids: string[], blocksEntities: {[id: string]: any}) => {
    return ids.findIndex((id: string) => {
      return blocksEntities[id].valid === false;
    }) === -1;
  }
);

export const getTextInputBlocksLoadingState = (state: State) => state.textInputBlocksLoading;
