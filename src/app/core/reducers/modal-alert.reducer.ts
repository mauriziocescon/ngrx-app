import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

import { ModalAlertActionTypes, ModalAlertActions } from "../actions/modal-alert.actions";
import { ModalAlert } from "../models";

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<ModalAlert> {
}

/**
 * createEntityAdapter creates many an object of helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const adapter: EntityAdapter<ModalAlert> = createEntityAdapter<ModalAlert>({
  selectId: (modal: ModalAlert) => modal.id,
  sortComparer: false,
});

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = adapter.getInitialState({});

export function reducer(state = initialState, action: ModalAlertActions): State {
  switch (action.type) {
    case ModalAlertActionTypes.SHOW_MODAL_ALERT: {
      return {
        ...adapter.addOne(action.payload.modal, state),
      };
    }
    case ModalAlertActionTypes.DISMISS_MODAL_ALERT: {
      return {
        ...adapter.removeOne(action.payload.id, state),
      };
    }
    default: {
      return state;
    }
  }
}
