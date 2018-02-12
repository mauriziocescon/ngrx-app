import { CheckBoxBlock } from "../../../dynamic-block-list/dynamic-block-list.module";

export const isValid = (checkBoxBlock: CheckBoxBlock) => {
  return checkBoxBlock.required ? !!checkBoxBlock.value : true;
};
