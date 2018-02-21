import { CheckBoxConfirmerBlock } from "../../models";

export const isValid = (checkBoxConfirmerBlock: CheckBoxConfirmerBlock) => {
  return checkBoxConfirmerBlock.required ? !!checkBoxConfirmerBlock.value : true;
};
