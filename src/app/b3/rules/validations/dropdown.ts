import { DropdownBlock } from "../../../dynamic-block-list/dynamic-block-list.module";

export const isValid = (dropdownBlock: DropdownBlock) => {
  return dropdownBlock.required ? !!dropdownBlock.value : true;
};
