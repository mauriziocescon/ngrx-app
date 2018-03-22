import { DropdownBlock } from '../../../instance-detail/instance-detail.module';

export const isValid = (dropdownBlock: DropdownBlock) => {
  return dropdownBlock.required ? !!dropdownBlock.value : true;
};
