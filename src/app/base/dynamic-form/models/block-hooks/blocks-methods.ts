import { CheckBoxMethods, DropdownMethods, TextInputMethods } from "../../../base/dynamic-form/dynamic-form.module";

import { CheckBoxConfirmerMethods } from "../../custom-blocks/custom-blocks.module";

export interface BlocksMethods {
  checkBox: CheckBoxMethods;
  dropdown: DropdownMethods;
  textInput: TextInputMethods;

  checkBoxConfirmer: CheckBoxConfirmerMethods;
}
