import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

import { TextInputConfirmerActionTypes, TextInputConfirmerActions } from "../../../actions/blocks/text-input-confirmer.actions";
import { TextInputConfirmerBlock } from "../../../models";

export interface State extends EntityState<TextInputConfirmerBlock> {
  textInputConfirmerBlocksLoading: { [id: string]: boolean };
}

export const adapter: EntityAdapter<TextInputConfirmerBlock> = createEntityAdapter<TextInputConfirmerBlock>({
  selectId: (block: TextInputConfirmerBlock) => block.id,
  sortComparer: (a: TextInputConfirmerBlock, b: TextInputConfirmerBlock) => {
    return a.id - b.id;
  },
});

export const initialState: State = adapter.getInitialState({
  textInputConfirmerBlocksLoading: {},
});

export function reducer(state = initialState, action: TextInputConfirmerActions): State {
  switch (action.type) {
    case TextInputConfirmerActionTypes.LOADING: {
      const newBlocksLoading = {...state.textInputConfirmerBlocksLoading};
      newBlocksLoading[action.payload.id] = action.payload.loading;
      return {
        ...state,
        textInputConfirmerBlocksLoading: newBlocksLoading,
      };
    }
    case TextInputConfirmerActionTypes.ADD_BLOCKS: {
      return {
        ...adapter.addMany(action.payload.blocks, state),
      };
    }
    case TextInputConfirmerActionTypes.UPDATE_BLOCK: {
      const textInputConfirmerBlock = state.entities[action.payload.block.id];
      if (!textInputConfirmerBlock) {
        return state;
      }

      const required = action.payload.block.changes.required || textInputConfirmerBlock.required;
      const value = action.payload.block.changes.value || textInputConfirmerBlock.value;
      const minLength = action.payload.block.changes.minLength || textInputConfirmerBlock.minLength;
      const maxLength = action.payload.block.changes.maxLength || textInputConfirmerBlock.maxLength;
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
