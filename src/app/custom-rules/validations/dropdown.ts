import { DropdownBlock } from "../../dynamic-form/dynamic-form.module";

export const isValid = (dropdownBlock: DropdownBlock) => {
  return dropdownBlock.required ? !!dropdownBlock.value : true;
};
