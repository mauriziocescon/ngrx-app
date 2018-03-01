import { createSelector } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

import { CheckBoxActionTypes, CheckBoxActions } from "../../../../actions/list/blocks/check-box.actions";
import { CheckBoxBlock } from "../../../../models";

export interface State extends EntityState<CheckBoxBlock> {
  checkBoxBlocksLoading: { [id: string]: boolean };
}

export const adapter: EntityAdapter<CheckBoxBlock> = createEntityAdapter<CheckBoxBlock>({
  selectId: (block: CheckBoxBlock) => block.id,
  sortComparer: (a: CheckBoxBlock, b: CheckBoxBlock) => {
    return a.order - b.order;
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
        ...adapter.upsertMany(action.payload, state),
      };
    }
    case CheckBoxActionTypes.UPDATE_BLOCK: {
      const checkBoxBlock = state.entities[action.payload.block.id];
      if (!checkBoxBlock) {
        return state;
      }
      return {
        ...adapter.updateOne(action.payload.block, state),
      };
    }
    case CheckBoxActionTypes.CLEAR_BLOCKS: {
      return adapter.removeAll({...state, checkBoxBlocksLoading: {}});
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

export const getCheckBoxBlocksValidityState = createSelector(
  getCheckBoxIds,
  getCheckBoxEntities,
  (ids: string[] | number[], blocksEntities: { [id: string]: CheckBoxBlock }) => {
    ids = ids as string[];
    return ids.findIndex((id: string) => {
      return blocksEntities[id].valid === false;
    }) === -1;
  }
);

export const getCheckBoxBlocksLoadingState = (state: State) => state.checkBoxBlocksLoading;
