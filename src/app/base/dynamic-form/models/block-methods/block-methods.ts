import { CheckBoxMethods } from "./check-box-methods.model";
import { DropdownMethods } from "./dropdown-methods.model";
import { TextInputMethods } from "./text-input-methods";

export interface BlocksMethods {
  checkBox: CheckBoxMethods;
  dropdown: DropdownMethods;
  textInput: TextInputMethods;
}
