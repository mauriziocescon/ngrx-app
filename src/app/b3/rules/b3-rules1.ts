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
export const checkBoxBlockDidLoad = (checkBoxBlock: CheckBoxBlock, blockActions: BlockActions) => {
  blocks[checkBoxBlock.id] = checkBoxBlock;
  blockActions.checkBox.setValidityForBlockId(validators.checkBoxBlockValidator(checkBoxBlock), checkBoxBlock.id);
};

export const dropdownBlockDidLoad = (dropdownBlock: DropdownBlock, blockActions: BlockActions) => {
  blocks[dropdownBlock.id] = dropdownBlock;
  blockActions.dropdown.setValidityForBlockId(validators.dropdownBlockValidator(dropdownBlock), dropdownBlock.id);
};

export const textInputBlockDidLoad = (textInputBlock: TextInputBlock, blockActions: BlockActions) => {
  blocks[textInputBlock.id] = textInputBlock;
  blockActions.textInput.setValidityForBlockId(validators.textInputBlockValidator(textInputBlock), textInputBlock.id);
};

// blocks changed
// --------------
export const checkBoxBlockDidChange = (checkBoxBlock: CheckBoxBlock, blockActions: BlockActions) => {
  blocks[checkBoxBlock.id] = checkBoxBlock;
  blockActions.checkBox.setValidityForBlockId(validators.checkBoxBlockValidator(checkBoxBlock), checkBoxBlock.id);
};

export const dropdownBlockDidChange = (dropdownBlock: DropdownBlock, blockActions: BlockActions) => {
  blocks[dropdownBlock.id] = dropdownBlock;
  blockActions.dropdown.setValidityForBlockId(validators.dropdownBlockValidator(dropdownBlock), dropdownBlock.id);
};

export const textInputBlockDidChange = (textInputBlock: TextInputBlock, blockActions: BlockActions) => {
  blocks[textInputBlock.id] = textInputBlock;
  blockActions.textInput.setValidityForBlockId(validators.textInputBlockValidator(textInputBlock), textInputBlock.id);
};
