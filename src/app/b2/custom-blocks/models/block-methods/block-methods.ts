import { BlocksMethods } from "../../../../dynamic-form/dynamic-form.module";

import { CheckBoxConfirmerMethods } from "./check-box-confirmer-methods";

export interface B2BlocksMethods extends BlocksMethods {
  checkBoxConfirmer: CheckBoxConfirmerMethods;
}
