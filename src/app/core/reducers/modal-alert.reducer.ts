import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

import { ModalAlertActionTypes, ModalAlertActions } from "../actions/modal-alert.actions";
import { ModalAlert } from "../models";

export interface State extends EntityState<ModalAlert> {
}

export const adapter: EntityAdapter<ModalAlert> = createEntityAdapter<ModalAlert>({
  selectId: (modal: ModalAlert) => modal.id,
  sortComparer: false,
});

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
