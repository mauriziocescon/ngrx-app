import { DropdownBlock } from "../../../dynamic-blocks-list/dynamic-blocks-list.module";

export const isValid = (dropdownBlock: DropdownBlock) => {
  return dropdownBlock.required ? !!dropdownBlock.value : true;
};
