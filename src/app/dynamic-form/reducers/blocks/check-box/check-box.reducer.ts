import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

import { CheckBoxActionTypes, CheckBoxActions } from "../../../actions/blocks/check-box.actions";
import { CheckBoxBlock } from "../../../models";

export interface State extends EntityState<CheckBoxBlock> {
  checkBoxBlocksLoading: { [id: string]: boolean };
}

export const adapter: EntityAdapter<CheckBoxBlock> = createEntityAdapter<CheckBoxBlock>({
  selectId: (block: CheckBoxBlock) => block.id,
  sortComparer: (a: CheckBoxBlock, b: CheckBoxBlock) => {
    return a.id - b.id;
  },
});

export const initialState: State = adapter.getInitialState({
  checkBoxBlocksLoading: {},
});

export function reducer(state = initialState, action: CheckBoxActions): State {
  switch (action.type) {
    case CheckBoxActionTypes.LOADING: {
      const newBlocksLoading = {...state.checkBoxBlocksLoading};
      newBlocksLoading[action.payload.id] = action.payload.loading;
      return {
        ...state,
        checkBoxBlocksLoading: newBlocksLoading,
      };
    }
    case CheckBoxActionTypes.ADD_BLOCKS: {
      return {
        ...adapter.addMany(action.payload.blocks, state),
      };
    }
    case CheckBoxActionTypes.UPDATE_BLOCK: {
      const checkBoxBlock = state.entities[action.payload.block.id];
      if (!checkBoxBlock) {
        return state;
      }

      const required = action.payload.block.changes.required || checkBoxBlock.required;
      const value = action.payload.block.changes.value || checkBoxBlock.value;
      const valid = required ? value : true;


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
