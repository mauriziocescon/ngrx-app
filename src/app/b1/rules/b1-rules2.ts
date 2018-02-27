import {
  CheckBoxBlock,
  DropdownBlock,
  TextInputBlock,
} from "../../instance-detail/instance-detail.module";

import {
  B1BlockActions,
  CheckBoxConfirmerBlock,
} from "../models";

import * as validators from "./validations";

// variables
// --------------
const blocks: { [id: string]: CheckBoxBlock | DropdownBlock | TextInputBlock | CheckBoxConfirmerBlock } = {};

// blocks loaded
// --------------
export const checkBoxBlockDidLoad = (checkBoxBlock: CheckBoxBlock, blocksMethods: B1BlockActions) => {
  blocks[checkBoxBlock.id] = checkBoxBlock;
  blocksMethods.checkBox.setValidityForBlockId(validators.checkBoxBlockValidator(checkBoxBlock), checkBoxBlock.id);
};

export const dropdownBlockDidLoad = (dropdownBlock: DropdownBlock, blocksMethods: B1BlockActions) => {
  blocks[dropdownBlock.id] = dropdownBlock;
  blocksMethods.dropdown.setValidityForBlockId(validators.dropdownBlockValidator(dropdownBlock), dropdownBlock.id);
};

export const textInputBlockDidLoad = (textInputBlock: TextInputBlock, blocksMethods: B1BlockActions) => {
  blocks[textInputBlock.id] = textInputBlock;
  blocksMethods.textInput.setValidityForBlockId(validators.textInputBlockValidator(textInputBlock), textInputBlock.id);
};

export const checkBoxConfirmerBlockDidLoad = (checkBoxConfirmerBlock: CheckBoxConfirmerBlock, blocksMethods: B1BlockActions) => {
  blocks[checkBoxConfirmerBlock.id] = checkBoxConfirmerBlock;
  blocksMethods.checkBoxConfirmer.setValidityForBlockId(validators.checkBoxConfirmerBlockValidator(checkBoxConfirmerBlock), checkBoxConfirmerBlock.id);
};

// blocks changed
// --------------
export const checkBoxBlockDidChange = (checkBoxBlock: CheckBoxBlock, blocksMethods: B1BlockActions) => {
  blocks[checkBoxBlock.id] = checkBoxBlock;
  blocksMethods.checkBox.setValidityForBlockId(validators.checkBoxBlockValidator(checkBoxBlock), checkBoxBlock.id);
};

export const dropdownBlockDidChange = (dropdownBlock: DropdownBlock, blocksMethods: B1BlockActions) => {
  blocks[dropdownBlock.id] = dropdownBlock;
  blocksMethods.dropdown.setValidityForBlockId(validators.dropdownBlockValidator(dropdownBlock), dropdownBlock.id);
};

export const textInputBlockDidChange = (textInputBlock: TextInputBlock, blocksMethods: B1BlockActions) => {
  blocks[textInputBlock.id] = textInputBlock;
  blocksMethods.textInput.setValidityForBlockId(validators.textInputBlockValidator(textInputBlock), textInputBlock.id);
};

export const checkBoxConfirmerBlockDidChange = (checkBoxConfirmerBlock: CheckBoxConfirmerBlock, blocksMethods: B1BlockActions) => {
  blocks[checkBoxConfirmerBlock.id] = checkBoxConfirmerBlock;
  blocksMethods.checkBoxConfirmer.setValidityForBlockId(validators.checkBoxConfirmerBlockValidator(checkBoxConfirmerBlock), checkBoxConfirmerBlock.id);
};
