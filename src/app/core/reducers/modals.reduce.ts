import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

import { ModalsActionTypes, ModalsActions } from "../actions/modals.actions";
import { Modal } from "../models";

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<Modal> {
  // extraVar: string | null;
}

/**
 * createEntityAdapter creates many an object of helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const adapter: EntityAdapter<Modal> = createEntityAdapter<Modal>({
  selectId: (modal: Modal) => modal.id,
  sortComparer: false,
});

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = adapter.getInitialState({
  // extraVar: null,
});

export function reducer(state = initialState, action: ModalsActions): State {
  switch (action.type) {
    case ModalsActionTypes.ADD_MODAL: {
      return {
        /**
         * The addOne function provided by the created adapter
         * adds one record to the entity dictionary
         * and returns a new state including that records if it doesn't
         * exist already. If the collection is to be sorted, the adapter will
         * insert the new record into the sorted array.
         */
        ...adapter.addOne(action.payload.modal, state),
      };
    }
    case ModalsActionTypes.UPDATE_MODAL: {
      return {
        ...adapter.updateOne(action.payload.modal, state),
      };
    }
    case ModalsActionTypes.DELETE_MODAL: {
      return {
        ...adapter.removeOne(action.payload.id, state),
      };
    }
    case ModalsActionTypes.DELETE_MODALS: {
      return {
        ...adapter.removeMany(action.payload.ids, state),
      };
    }
    default: {
      return state;
    }
  }
}
