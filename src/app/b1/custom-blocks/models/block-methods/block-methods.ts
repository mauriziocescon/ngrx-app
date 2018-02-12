import { BlocksMethods } from "../../../../dynamic-block-list/dynamic-block-list.module";

import { CheckBoxConfirmerMethods } from "./check-box-confirmer-methods";

export interface B1BlocksMethods extends BlocksMethods {
  checkBoxConfirmer: CheckBoxConfirmerMethods;
}
