import { createSelector } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

import {
  DossierActionTypes,
  DossierActions
} from "../../../actions/blocks/dossier.actions";

import { DossierBlock } from "../../../models";

export interface State extends EntityState<DossierBlock> {
  dossierBlocksLoading: { [id: string]: boolean };
}

export const adapter: EntityAdapter<DossierBlock> = createEntityAdapter<DossierBlock>({
  selectId: (block: DossierBlock) => block.id,
  sortComparer: (a: DossierBlock, b: DossierBlock) => {
    return a.order - b.order;
  },
});

export const initialState: State = adapter.getInitialState({
  dossierBlocksLoading: {},
});

export function reducer(state = initialState, action: DossierActions): State {
  switch (action.type) {
    case DossierActionTypes.LOADING: {
      const newBlocksLoading = {...state.dossierBlocksLoading};
      newBlocksLoading[action.payload.id] = action.payload.loading;
      return {...state, dossierBlocksLoading: newBlocksLoading};
    }
    case DossierActionTypes.ADD_BLOCKS: {
      return adapter.upsertMany(action.payload, state);
    }
    case DossierActionTypes.UPDATE_BLOCK: {
      const dossierBlock = state.entities[action.payload.block.id];
      if (!dossierBlock) {
        return state;
      }
      return adapter.updateOne(action.payload.block, state);
    }
    case DossierActionTypes.CLEAR_BLOCKS: {
      return adapter.removeAll({...state, dossierBlocksLoading: {}});
    }
    default: {
      return state;
    }
  }
}

export const {
  selectIds: getDossierIds,
  selectEntities: getDossierEntities,
  selectAll: getAllDossier,
  selectTotal: getTotalDossier,
} = adapter.getSelectors();

export const getDossierBlocksValidityState = createSelector(
  getDossierIds,
  getDossierEntities,
  (ids: string[] | number[], blocksEntities: { [id: string]: DossierBlock }) => {
    ids = ids as string[];
    return ids.findIndex((id: string) => {
      return blocksEntities[id].valid === false;
    }) === -1;
  }
);

export const getDossierBlocksLoadingState = (state: State) => state.dossierBlocksLoading;
