import { BlocksMethods } from "../../../../dynamic-form/dynamic-form.module";

import { DatePickerMethods } from "./date-picker-methods";

export interface B2BlocksMethods extends BlocksMethods {
  datePicker: DatePickerMethods;
}
