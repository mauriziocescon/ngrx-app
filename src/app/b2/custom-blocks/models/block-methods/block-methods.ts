import { BlocksMethods } from "../../../../dynamic-blocks-list/dynamic-blocks-list.module";

import { DatePickerMethods } from "./date-picker-methods";

export interface B2BlocksMethods extends BlocksMethods {
  datePicker: DatePickerMethods;
}
