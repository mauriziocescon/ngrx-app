import { BlocksMethods } from "../../../../dynamic-blocks-list/dynamic-blocks-list.module";

import { CheckBoxConfirmerMethods } from "./check-box-confirmer-methods";

export interface B1BlocksMethods extends BlocksMethods {
  checkBoxConfirmer: CheckBoxConfirmerMethods;
}
