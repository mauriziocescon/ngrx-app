import { CheckBoxBlock } from "../../../dynamic-blocks-list/dynamic-blocks-list.module";

export const isValid = (checkBoxBlock: CheckBoxBlock) => {
  return checkBoxBlock.required ? !!checkBoxBlock.value : true;
};
