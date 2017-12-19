import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

import { CheckBoxActionTypes, CheckBoxActions } from "../actions/blocks/check-box.actions";
import { DropdownActionTypes, DropdownActions } from "../actions/blocks/dropdown.actions";
import { TextInputActionTypes, TextInputActions } from "../actions/blocks/text-input.actions";
import { EditBlocksActionTypes, EditBlocksActions } from "../actions/edit-blocks.actions";
import { Block } from "../models";

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<Block> {
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
export const adapter: EntityAdapter<Block> = createEntityAdapter<Block>({
  selectId: (block: Block) => block.id,
  sortComparer: (a: Block, b: Block) => {
    return a.id - b.id;
  },
});

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = adapter.getInitialState({
  // extraVar: null,
});

export function reducer(state = initialState, action: CheckBoxActions | DropdownActions | TextInputActions | EditBlocksActions): State {
  switch (action.type) {
    case CheckBoxActionTypes.CHECK_BOX_UPDATE_BLOCK: {
      return {
        /**
         * The updateOne function provided by the created adapter
         * updates one record to the entity dictionary
         * and returns a new state including those records. If
         * the collection is to be sorted, the adapter will
         * sort each record upon entry into the sorted array.
         */
        ...adapter.updateOne(action.payload.block, state),
      };
    }
    case DropdownActionTypes.DROPDOWN_UPDATE_BLOCK: {
      return {
        /**
         * The updateOne function provided by the created adapter
         * updates one record to the entity dictionary
         * and returns a new state including those records. If
         * the collection is to be sorted, the adapter will
         * sort each record upon entry into the sorted array.
         */
        ...adapter.updateOne(action.payload.block, state),
      };
    }
    case TextInputActionTypes.TEXT_INPUT_UPDATE_BLOCK: {
      return {
        /**
         * The updateOne function provided by the created adapter
         * updates one record to the entity dictionary
         * and returns a new state including those records. If
         * the collection is to be sorted, the adapter will
         * sort each record upon entry into the sorted array.
         */
        ...adapter.updateOne(action.payload.block, state),
      };
    }
    case EditBlocksActionTypes.ADD_BLOCKS: {
      return {
        /**
         * The updateOne function provided by the created adapter
         * updates one record to the entity dictionary
         * and returns a new state including those records. If
         * the collection is to be sorted, the adapter will
         * sort each record upon entry into the sorted array.
         */
        ...adapter.addMany(action.payload.blocks, state),
      };
    }
    default: {
      return state;
    }
  }
}
