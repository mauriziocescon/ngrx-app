import {
  BlockActions,
  CheckBoxBlock,
  DropdownBlock,
  TextInputBlock,
} from "../../instance-detail/instance-detail.module";

import * as utilities from "./utils/utilities";
import * as validators from "./validations";

// variables
// --------------
const blocks: { [id: string]: CheckBoxBlock | DropdownBlock | TextInputBlock } = {};

// blocks loaded
// --------------
export const checkBoxBlockDidLoad = (checkBoxBlock: CheckBoxBlock, blocksMethods: BlockActions) => {
  blocks[checkBoxBlock.id] = checkBoxBlock;
  blocksMethods.checkBox.setValidityForBlockId(validators.checkBoxBlockValidator(checkBoxBlock), checkBoxBlock.id);
};

export const dropdownBlockDidLoad = (dropdownBlock: DropdownBlock, blocksMethods: BlockActions) => {
  blocks[dropdownBlock.id] = dropdownBlock;
  blocksMethods.dropdown.setValidityForBlockId(validators.dropdownBlockValidator(dropdownBlock), dropdownBlock.id);
};

export const textInputBlockDidLoad = (textInputBlock: TextInputBlock, blocksMethods: BlockActions) => {
  blocks[textInputBlock.id] = textInputBlock;
  blocksMethods.textInput.setValidityForBlockId(validators.textInputBlockValidator(textInputBlock), textInputBlock.id);
};

// blocks changed
// --------------
export const checkBoxBlockDidChange = (checkBoxBlock: CheckBoxBlock, blocksMethods: BlockActions) => {
  blocks[checkBoxBlock.id] = checkBoxBlock;
  blocksMethods.checkBox.setValidityForBlockId(validators.checkBoxBlockValidator(checkBoxBlock), checkBoxBlock.id);
};

export const dropdownBlockDidChange = (dropdownBlock: DropdownBlock, blocksMethods: BlockActions) => {
  blocks[dropdownBlock.id] = dropdownBlock;
  blocksMethods.dropdown.setValidityForBlockId(validators.dropdownBlockValidator(dropdownBlock), dropdownBlock.id);
};

export const textInputBlockDidChange = (textInputBlock: TextInputBlock, blocksMethods: BlockActions) => {
  blocks[textInputBlock.id] = textInputBlock;
  blocksMethods.textInput.setValidityForBlockId(validators.textInputBlockValidator(textInputBlock), textInputBlock.id);
};
