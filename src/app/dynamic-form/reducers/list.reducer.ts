import * as list from "../actions/list.action";
import { Block } from "../models";

export interface State {
  blocks: Block[];
  loading: boolean;
  error: string;
}

const initialState: State = {
  blocks: [],
  loading: false,
  error: "",
};

export function reducer(state = initialState, action: list.Actions): State {
  switch (action.type) {
    case list.FETCH_BLOCKS: {
      return {
        ...state,
        blocks: undefined,
        loading: true,
        error: undefined,
      };
    }
    case list.FETCH_BLOCKS_COMPLETE: {
      return {
        blocks: action.payload.map(blocks => blocks),
        loading: false,
        error: undefined,
      };
    }
    case list.FETCH_BLOCKS_ERROR: {
      return {
        ...state,
        blocks: undefined,
        loading: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
