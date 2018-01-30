import { createSelector } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

import { CheckBoxConfirmerActionTypes, CheckBoxConfirmerActions } from "../../../actions/blocks/date-picker.actions";
import { CheckBoxConfirmerBlock } from "../../../models";

export interface State extends EntityState<CheckBoxConfirmerBlock> {
  checkBoxConfirmerBlocksLoading: { [id: string]: boolean };
}

export const adapter: EntityAdapter<CheckBoxConfirmerBlock> = createEntityAdapter<CheckBoxConfirmerBlock>({
  selectId: (block: CheckBoxConfirmerBlock) => block.id,
  sortComparer: (a: CheckBoxConfirmerBlock, b: CheckBoxConfirmerBlock) => {
    return a.id - b.id;
  },
});

export const initialState: State = adapter.getInitialState({
  checkBoxConfirmerBlocksLoading: {},
});

export function reducer(state = initialState, action: CheckBoxConfirmerActions): State {
  switch (action.type) {
    case CheckBoxConfirmerActionTypes.LOADING: {
      const newBlocksLoading = {...state.checkBoxConfirmerBlocksLoading};
      newBlocksLoading[action.payload.id] = action.payload.loading;
      return {
        ...state,
        checkBoxConfirmerBlocksLoading: newBlocksLoading,
      };
    }
    case CheckBoxConfirmerActionTypes.ADD_BLOCKS: {
      return {
        ...adapter.addMany(action.payload.blocks, state),
      };
    }
    case CheckBoxConfirmerActionTypes.UPDATE_BLOCK: {
      const checkBoxConfirmerBlock = state.entities[action.payload.block.id];
      if (!checkBoxConfirmerBlock) {
        return state;
      }
      return {
        ...adapter.updateOne(action.payload.block, state),
      };
    }
    default: {
      return state;
    }
  }
}

export const {
  selectIds: getCheckBoxConfirmerIds,
  selectEntities: getCheckBoxConfirmerEntities,
  selectAll: getAllCheckBoxConfirmer,
  selectTotal: getTotalCheckBoxConfirmer,
} = adapter.getSelectors();

export const getCheckBoxConfirmerBlocksValidityState = createSelector(
  getCheckBoxConfirmerIds,
  getCheckBoxConfirmerEntities,
  (ids: number[], blocksEntities: { [id: string]: any }) => {
    return ids.findIndex((id: number) => {
      return blocksEntities[id].valid === false;
    }) === -1;
  }
);

export const getCheckBoxConfirmerBlocksLoadingState = (state: State) => state.checkBoxConfirmerBlocksLoading;
