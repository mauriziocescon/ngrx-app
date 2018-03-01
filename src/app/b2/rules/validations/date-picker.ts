import { DatePickerBlock } from "../../models";

export const isValid = (datePickerBlock: DatePickerBlock) => {
  const unixTimeZero = datePickerBlock.value !== undefined ? Date.parse(datePickerBlock.value) : NaN;
  return datePickerBlock.required ? !!datePickerBlock.value && !isNaN(unixTimeZero) : true;
};
