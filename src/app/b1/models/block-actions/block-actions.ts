import { BlockActions } from "../../../instance-detail/instance-detail.module";

import { CheckBoxConfirmerActions } from "./check-box-confirmer-actions";

export interface B1BlockActions extends BlockActions {
  checkBoxConfirmer: CheckBoxConfirmerActions;
}
