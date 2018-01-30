import { CheckBoxConfirmerBlock } from "../../custom-blocks/b1.module";

export const isValid = (checkBoxConfirmerBlock: CheckBoxConfirmerBlock) => {
  return checkBoxConfirmerBlock.required ? !!checkBoxConfirmerBlock.value : true;
};
