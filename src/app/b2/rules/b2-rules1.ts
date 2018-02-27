import {
  CheckBoxBlock,
  DropdownBlock,
  TextInputBlock,
} from "../../instance-detail/instance-detail.module";

import {
  B2BlockActions,
  DatePickerBlock,
} from "../models";

import * as utilities from "./utils/utilities";
import * as validators from "./validations";

// variables
// --------------
const blocks: { [id: string]: CheckBoxBlock | DropdownBlock | TextInputBlock | DatePickerBlock } = {};

// blocks loaded
// --------------
export const checkBoxBlockDidLoad = (checkBoxBlock: CheckBoxBlock, blockActions: B2BlockActions) => {
  blocks[checkBoxBlock.id] = checkBoxBlock;
  blockActions.checkBox.setValidityForBlockId(validators.checkBoxBlockValidator(checkBoxBlock), checkBoxBlock.id);
};

export const dropdownBlockDidLoad = (dropdownBlock: DropdownBlock, blockActions: B2BlockActions) => {
  blocks[dropdownBlock.id] = dropdownBlock;
  blockActions.dropdown.setValidityForBlockId(validators.dropdownBlockValidator(dropdownBlock), dropdownBlock.id);
};

export const textInputBlockDidLoad = (textInputBlock: TextInputBlock, blockActions: B2BlockActions) => {
  blocks[textInputBlock.id] = textInputBlock;
  blockActions.textInput.setValidityForBlockId(validators.textInputBlockValidator(textInputBlock), textInputBlock.id);
};

export const datePickerBlockDidLoad = (datePickerBlock: DatePickerBlock, blockActions: B2BlockActions) => {
  blocks[datePickerBlock.id] = datePickerBlock;
  blockActions.datePicker.setValidityForBlockId(validators.datePickerBlockValidator(datePickerBlock), datePickerBlock.id);
};

// blocks changed
// --------------
export const checkBoxBlockDidChange = (checkBoxBlock: CheckBoxBlock, blockActions: B2BlockActions) => {
  blocks[checkBoxBlock.id] = checkBoxBlock;
  blockActions.checkBox.setValidityForBlockId(validators.checkBoxBlockValidator(checkBoxBlock), checkBoxBlock.id);
};

export const dropdownBlockDidChange = (dropdownBlock: DropdownBlock, blockActions: B2BlockActions) => {
  blocks[dropdownBlock.id] = dropdownBlock;
  blockActions.dropdown.setValidityForBlockId(validators.dropdownBlockValidator(dropdownBlock), dropdownBlock.id);
};

export const textInputBlockDidChange = (textInputBlock: TextInputBlock, blockActions: B2BlockActions) => {
  blocks[textInputBlock.id] = textInputBlock;
  blockActions.textInput.setValidityForBlockId(validators.textInputBlockValidator(textInputBlock), textInputBlock.id);
};

export const datePickerBlockDidChange = (datePickerBlock: DatePickerBlock, blockActions: B2BlockActions) => {
  blocks[datePickerBlock.id] = datePickerBlock;
  blockActions.datePicker.setValidityForBlockId(validators.datePickerBlockValidator(datePickerBlock), datePickerBlock.id);
};
