import * as fromRoot from "../../reducers";
import * as fromList from "./list.reducer";

export interface DynamicFormState {
  list: fromList.State;
}

export interface State extends fromRoot.State {
  dynamicForm: DynamicFormState;
}

export const reducers = {
  list: fromList.reducer,
};
