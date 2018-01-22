import { createSelector } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

import { TextInputActionTypes, TextInputActions } from "../../../actions/blocks/text-input.actions";
import { TextInputBlock } from "../../../models";

export interface State extends EntityState<TextInputBlock> {
  textInputBlocksLoading: { [id: string]: boolean };
}

export const adapter: EntityAdapter<TextInputBlock> = createEntityAdapter<TextInputBlock>({
  selectId: (block: TextInputBlock) => block.id,
  sortComparer: (a: TextInputBlock, b: TextInputBlock) => {
    return a.id - b.id;
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
        ...adapter.addMany(action.payload.blocks, state),
      };
    }
    case TextInputActionTypes.UPDATE_BLOCK: {
      const textInputBlock = state.entities[action.payload.block.id];
      if (!textInputBlock) {
        return state;
      }

      const required = action.payload.block.changes.required || textInputBlock.required;
      const value = action.payload.block.changes.value || textInputBlock.value;
      const minLength = action.payload.block.changes.minLength || textInputBlock.minLength;
      const maxLength = action.payload.block.changes.maxLength || textInputBlock.maxLength;
      let valid = true;

      if (required && (!value || !value.length)) {
        valid = false;
      }

      if (minLength >= 0 && value !== undefined && value.length < minLength) {
        valid = false;
      }

      if (maxLength >= 0 && value !== undefined && value.length > maxLength) {
        valid = false;
      }

      const newBlock = {
        ...action.payload.block,
        changes: {
          ...action.payload.block.changes,
          valid: valid,
        },
      };

      return {
        ...adapter.updateOne(newBlock, state),
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

export const getTextInputBlocksValidityState = createSelector(
  getTextInputIds,
  getTextInputEntities,
  (ids: number[], blocksEntities: { [id: string]: any }) => {
    return ids.findIndex((id: number) => {
      return blocksEntities[id].valid === false;
    }) === -1;
  }
);

export const getTextInputBlocksLoadingState = (state: State) => state.textInputBlocksLoading;
