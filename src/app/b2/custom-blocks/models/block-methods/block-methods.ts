import { BlocksMethods } from "../../../../dynamic-block-list/dynamic-block-list.module";

import { DatePickerMethods } from "./date-picker-methods";

export interface B2BlocksMethods extends BlocksMethods {
  datePicker: DatePickerMethods;
}
