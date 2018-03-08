import { createSelector } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

import {
  CheckBoxConfirmerActionTypes,
  CheckBoxConfirmerActions
} from "../../../actions/blocks/check-box-confirmer.actions";

import { CheckBoxConfirmerBlock } from "../../../models";

export interface State extends EntityState<CheckBoxConfirmerBlock> {
  checkBoxConfirmerBlocksLoading: { [id: string]: boolean };
}

export const adapter: EntityAdapter<CheckBoxConfirmerBlock> = createEntityAdapter<CheckBoxConfirmerBlock>({
  selectId: (block: CheckBoxConfirmerBlock) => block.id,
  sortComparer: (a: CheckBoxConfirmerBlock, b: CheckBoxConfirmerBlock) => {
    return a.order - b.order;
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
      return {...state, checkBoxConfirmerBlocksLoading: newBlocksLoading};
    }
    case CheckBoxConfirmerActionTypes.ADD_BLOCKS: {
      return adapter.upsertMany(action.payload, state);
    }
    case CheckBoxConfirmerActionTypes.UPDATE_BLOCK: {
      const checkBoxConfirmerBlock = state.entities[action.payload.block.id];
      if (!checkBoxConfirmerBlock) {
        return state;
      }
      return adapter.updateOne(action.payload.block, state);
    }
    case CheckBoxConfirmerActionTypes.CLEAR_BLOCKS: {
      return adapter.removeAll({...state, checkBoxConfirmerBlocksLoading: {}});
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
  (ids: string[] | number[], blocksEntities: { [id: string]: CheckBoxConfirmerBlock }) => {
    ids = ids as string[];
    return ids.findIndex((id: string) => {
      return blocksEntities[id].valid === false;
    }) === -1;
  }
);

export const getCheckBoxConfirmerBlocksLoadingState = (state: State) => state.checkBoxConfirmerBlocksLoading;
