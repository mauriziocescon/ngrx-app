import { BlocksMethods } from "../../../instance-detail/instance-detail.module";

import { DatePickerMethods } from "./date-picker-methods";

export interface B2BlocksMethods extends BlocksMethods {
  datePicker: DatePickerMethods;
}
