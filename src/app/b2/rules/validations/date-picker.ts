import { DatePickerBlock } from "../../custom-blocks/b2.module";

export const isValid = (datePickerBlock: DatePickerBlock) => {
  return datePickerBlock.required ? !!datePickerBlock.value : true;
};
