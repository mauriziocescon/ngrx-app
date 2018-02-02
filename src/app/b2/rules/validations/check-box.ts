import { CheckBoxBlock } from "../../../dynamic-form/dynamic-form.module";

export const isValid = (checkBoxBlock: CheckBoxBlock) => {
  return checkBoxBlock.required ? !!checkBoxBlock.value : true;
};
