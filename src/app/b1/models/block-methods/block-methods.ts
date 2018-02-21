import { BlocksMethods } from "../../../instance-detail/instance-detail.module";

import { CheckBoxConfirmerMethods } from "./check-box-confirmer-methods";

export interface B1BlocksMethods extends BlocksMethods {
  checkBoxConfirmer: CheckBoxConfirmerMethods;
}
