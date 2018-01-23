import { CheckBoxConfirmerBlock } from "../../custom-blocks/models";

export const isValid = (checkBoxConfirmerBlock: CheckBoxConfirmerBlock) => {
  return checkBoxConfirmerBlock.required ? !!checkBoxConfirmerBlock.value : true;
};
