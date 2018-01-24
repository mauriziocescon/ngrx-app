import { CheckBoxConfirmerBlock } from "../../custom-blocks/custom-blocks.module";

export const isValid = (checkBoxConfirmerBlock: CheckBoxConfirmerBlock) => {
  return checkBoxConfirmerBlock.required ? !!checkBoxConfirmerBlock.value : true;
};
