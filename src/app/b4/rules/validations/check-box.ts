import { CheckBoxBlock } from "../../../instance-detail/instance-detail.module";

export const isValid = (checkBoxBlock: CheckBoxBlock) => {
  return checkBoxBlock.required ? !!checkBoxBlock.value : true;
};
