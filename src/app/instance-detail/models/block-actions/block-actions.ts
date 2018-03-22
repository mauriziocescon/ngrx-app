import { CheckBoxActions } from './check-box-actions.model';
import { DropdownActions } from './dropdown-actions.model';
import { TextInputActions } from './text-input-actions';

export interface BlockActions {
  checkBox: CheckBoxActions;
  dropdown: DropdownActions;
  textInput: TextInputActions;
}
