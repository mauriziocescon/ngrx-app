import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

import { ModalConfirmerActionTypes, ModalConfirmerActions } from "../actions/modal-confirmer.actions";
import { ModalConfirmer } from "../models";

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<ModalConfirmer> {
  modalConfirmerResults: { [id: string]: boolean };
}

/**
 * createEntityAdapter creates many an object of helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const adapter: EntityAdapter<ModalConfirmer> = createEntityAdapter<ModalConfirmer>({
  selectId: (modal: ModalConfirmer) => modal.id,
  sortComparer: false,
});

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = adapter.getInitialState({
  modalConfirmerResults: {},
});

export function reducer(state = initialState, action: ModalConfirmerActions): State {
  switch (action.type) {
    case ModalConfirmerActionTypes.SHOW_MODAL_CONFIRMER: {
      return {
        ...adapter.addOne(action.payload.modal, state),
        modalConfirmerResults: state.modalConfirmerResults,
      };
    }
    case ModalConfirmerActionTypes.DISMISS_MODAL_CONFIRMER_WITH_POSITIVE_RESULT: {
      const newModalConfirmerResults = {...state.modalConfirmerResults};
      newModalConfirmerResults[action.payload.id] = true;
      return {
        ...adapter.removeOne(action.payload.id, state),
        modalConfirmerResults: newModalConfirmerResults,
      };
    }
    case ModalConfirmerActionTypes.DISMISS_MODAL_CONFIRMER_WITH_NEGATIVE_RESULT: {
      const newModalConfirmerResults = {...state.modalConfirmerResults};
      newModalConfirmerResults[action.payload.id] = false;
      return {
        ...adapter.removeOne(action.payload.id, state),
        modalConfirmerResults: newModalConfirmerResults,
      };
    }
    case ModalConfirmerActionTypes.DISMISS_MODAL_CONFIRMER: {
      const newModalConfirmerResults = {...state.modalConfirmerResults};
      newModalConfirmerResults[action.payload.id] = undefined;
      return {
        ...adapter.removeOne(action.payload.id, state),
        modalConfirmerResults: newModalConfirmerResults,
      };
    }
    default: {
      return state;
    }
  }
}
