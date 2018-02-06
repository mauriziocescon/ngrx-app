import { DatePickerBlock } from "../../custom-blocks/b2.module";

export const isValid = (datePickerBlock: DatePickerBlock) => {
  const unixTimeZero = Date.parse(datePickerBlock.value);
  return datePickerBlock.required ? !!datePickerBlock.value && !isNaN(unixTimeZero) : true;
};
