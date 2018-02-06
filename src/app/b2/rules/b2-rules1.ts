import {
  CheckBoxBlock,
  DropdownBlock,
  TextInputBlock,
} from "../../dynamic-blocks-list/dynamic-blocks-list.module";

import {
  B2BlocksMethods,
  DatePickerBlock,
} from "../custom-blocks/b2.module";

import * as utilities from "./utils/utilities";
import * as validators from "./validations";

// variables
// --------------
const blocks: { [id: string]: CheckBoxBlock | DropdownBlock | TextInputBlock | DatePickerBlock } = {};

// blocks loaded
// --------------
export const checkBoxBlockDidLoad = (checkBoxBlock: CheckBoxBlock, blocksMethods: B2BlocksMethods) => {
  blocks[checkBoxBlock.id] = checkBoxBlock;
  blocksMethods.checkBox.setValidityForBlockId(validators.checkBoxBlockValidator(checkBoxBlock), checkBoxBlock.id);
};

export const dropdownBlockDidLoad = (dropdownBlock: DropdownBlock, blocksMethods: B2BlocksMethods) => {
  blocks[dropdownBlock.id] = dropdownBlock;
  blocksMethods.dropdown.setValidityForBlockId(validators.dropdownBlockValidator(dropdownBlock), dropdownBlock.id);
};

export const textInputBlockDidLoad = (textInputBlock: TextInputBlock, blocksMethods: B2BlocksMethods) => {
  blocks[textInputBlock.id] = textInputBlock;
  blocksMethods.textInput.setValidityForBlockId(validators.textInputBlockValidator(textInputBlock), textInputBlock.id);
};

export const datePickerBlockDidLoad = (datePickerBlock: DatePickerBlock, blocksMethods: B2BlocksMethods) => {
  blocks[datePickerBlock.id] = datePickerBlock;
  blocksMethods.datePicker.setValidityForBlockId(validators.datePickerBlockValidator(datePickerBlock), datePickerBlock.id);
};

// blocks changed
// --------------
export const checkBoxBlockDidChange = (checkBoxBlock: CheckBoxBlock, blocksMethods: B2BlocksMethods) => {
  blocks[checkBoxBlock.id] = checkBoxBlock;
  blocksMethods.checkBox.setValidityForBlockId(validators.checkBoxBlockValidator(checkBoxBlock), checkBoxBlock.id);
};

export const dropdownBlockDidChange = (dropdownBlock: DropdownBlock, blocksMethods: B2BlocksMethods) => {
  blocks[dropdownBlock.id] = dropdownBlock;
  blocksMethods.dropdown.setValidityForBlockId(validators.dropdownBlockValidator(dropdownBlock), dropdownBlock.id);
};

export const textInputBlockDidChange = (textInputBlock: TextInputBlock, blocksMethods: B2BlocksMethods) => {
  blocks[textInputBlock.id] = textInputBlock;
  blocksMethods.textInput.setValidityForBlockId(validators.textInputBlockValidator(textInputBlock), textInputBlock.id);
};

export const datePickerBlockDidChange = (datePickerBlock: DatePickerBlock, blocksMethods: B2BlocksMethods) => {
  blocks[datePickerBlock.id] = datePickerBlock;
  blocksMethods.datePicker.setValidityForBlockId(validators.datePickerBlockValidator(datePickerBlock), datePickerBlock.id);
};
