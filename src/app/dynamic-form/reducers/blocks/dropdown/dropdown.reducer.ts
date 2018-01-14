import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

import { DropdownActionTypes, DropdownActions } from "../../../actions/blocks/dropdown.actions";
import { DropdownBlock } from "../../../models";

export interface State extends EntityState<DropdownBlock> {
  dropdownBlocksLoading: { [id: string]: boolean };
}

export const adapter: EntityAdapter<DropdownBlock> = createEntityAdapter<DropdownBlock>({
  selectId: (block: DropdownBlock) => block.id,
  sortComparer: (a: DropdownBlock, b: DropdownBlock) => {
    return a.id - b.id;
  },
});

export const initialState: State = adapter.getInitialState({
  dropdownBlocksLoading: {},
});

export function reducer(state = initialState, action: DropdownActions): State {
  switch (action.type) {
    case DropdownActionTypes.LOADING: {
      const newBlocksLoading = {...state.dropdownBlocksLoading};
      newBlocksLoading[action.payload.id] = action.payload.loading;
      return {
        ...state,
        dropdownBlocksLoading: newBlocksLoading,
      };
    }
    case DropdownActionTypes.ADD_BLOCKS: {
      return {
        ...adapter.addMany(action.payload.blocks, state),
      };
    }
    case DropdownActionTypes.UPDATE_BLOCK: {
      const dropdownBlock = state.entities[action.payload.block.id];
      const value = action.payload.block.changes.value;
      const valid = dropdownBlock.required ? !!value : true;

      if (!dropdownBlock) {
        return state;
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
