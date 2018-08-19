import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { CheckBoxConfirmerActionTypes, CheckBoxConfirmerActions } from '../../actions/blocks/check-box-confirmer.actions';

import { CheckBoxConfirmerBlock } from '../../models';

export interface State extends EntityState<CheckBoxConfirmerBlock> {
}

export const adapter: EntityAdapter<CheckBoxConfirmerBlock> = createEntityAdapter<CheckBoxConfirmerBlock>({
  selectId: (block: CheckBoxConfirmerBlock) => block.id,
  sortComparer: (a: CheckBoxConfirmerBlock, b: CheckBoxConfirmerBlock) => {
    return a.order - b.order;
  },
});

export const initialState: State = adapter.getInitialState({});

export function reducer(state = initialState, action: CheckBoxConfirmerActions): State {
  switch (action.type) {
    case CheckBoxConfirmerActionTypes.ADD_BLOCK: {
      return adapter.upsertOne(action.payload.block, state);
    }
    case CheckBoxConfirmerActionTypes.UPDATE_BLOCK: {
      return adapter.updateOne(action.payload.block, state);
    }
    case CheckBoxConfirmerActionTypes.CLEAR_BLOCK: {
      return adapter.removeOne(action.payload.id, state);
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
