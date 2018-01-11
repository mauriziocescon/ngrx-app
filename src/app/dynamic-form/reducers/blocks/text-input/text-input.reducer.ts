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
      const value = action.payload.block.changes.value;
      let valid = true;

      if (textInputBlock.required && (!value || !value.length)) {
        valid = false;
      }

      if (textInputBlock.minLength >= 0 && value !== undefined && value.length < textInputBlock.minLength) {
        valid = false;
      }

      if (textInputBlock.maxLength >= 0 && value !== undefined && value.length > textInputBlock.maxLength) {
        valid = false;
      }
      action.payload.block.changes.valid = valid;

      return {
        ...adapter.updateOne(action.payload.block, state),
      };
    }
    default: {
      return state;
    }
  }
}
