import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

import { ModalConfirmerActionTypes, ModalConfirmerActions } from "../actions/modal-confirmer.actions";
import { ModalConfirmer, ModalConfirmerResultType } from "../models";

export interface State extends EntityState<ModalConfirmer> {
  modalConfirmerResults: { [id: string]: ModalConfirmerResultType | undefined };
}

export const adapter: EntityAdapter<ModalConfirmer> = createEntityAdapter<ModalConfirmer>({
  selectId: (modal: ModalConfirmer) => modal.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  modalConfirmerResults: {},
});

export function reducer(state = initialState, action: ModalConfirmerActions): State {
  switch (action.type) {
    case ModalConfirmerActionTypes.SHOW_MODAL_CONFIRMER: {
      return adapter.addOne(action.payload.modal, state);
    }
    case ModalConfirmerActionTypes.DISMISS_MODAL_CONFIRMER_WITH_POSITIVE_RESULT: {
      const newModalConfirmerResults = {...state.modalConfirmerResults};
      newModalConfirmerResults[action.payload.id] = ModalConfirmerResultType.Positive;
      return adapter.removeOne(action.payload.id, {...state, modalConfirmerResults: newModalConfirmerResults});
    }
    case ModalConfirmerActionTypes.DISMISS_MODAL_CONFIRMER_WITH_NEGATIVE_RESULT: {
      const newModalConfirmerResults = {...state.modalConfirmerResults};
      newModalConfirmerResults[action.payload.id] = ModalConfirmerResultType.Negative;
      return adapter.removeOne(action.payload.id, {...state, modalConfirmerResults: newModalConfirmerResults});
    }
    case ModalConfirmerActionTypes.DISMISS_MODAL_CONFIRMER: {
      const newModalConfirmerResults = {...state.modalConfirmerResults};
      newModalConfirmerResults[action.payload.id] = ModalConfirmerResultType.Dismiss;
      return adapter.removeOne(action.payload.id, {...state, modalConfirmerResults: newModalConfirmerResults});
    }
    case ModalConfirmerActionTypes.CLEAN_MODAL_CONFIRMER_RESULT: {
      const newModalConfirmerResults = {...state.modalConfirmerResults};
      newModalConfirmerResults[action.payload.id] = undefined;
      return {...state, modalConfirmerResults: newModalConfirmerResults};
    }
    default: {
      return state;
    }
  }
}
