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
export const checkBoxBlockDidLoad = (checkBoxBlock: CheckBoxBlock, blockActions: B1BlockActions) => {
  blocks[checkBoxBlock.id] = checkBoxBlock;
  blockActions.checkBox.setValidityForBlockId(validators.checkBoxBlockValidator(checkBoxBlock), checkBoxBlock.id);
};

export const dropdownBlockDidLoad = (dropdownBlock: DropdownBlock, blockActions: B1BlockActions) => {
  blocks[dropdownBlock.id] = dropdownBlock;
  blockActions.dropdown.setValidityForBlockId(validators.dropdownBlockValidator(dropdownBlock), dropdownBlock.id);
};

export const textInputBlockDidLoad = (textInputBlock: TextInputBlock, blockActions: B1BlockActions) => {
  blocks[textInputBlock.id] = textInputBlock;
  blockActions.textInput.setValidityForBlockId(validators.textInputBlockValidator(textInputBlock), textInputBlock.id);
};

export const checkBoxConfirmerBlockDidLoad = (checkBoxConfirmerBlock: CheckBoxConfirmerBlock, blockActions: B1BlockActions) => {
  blocks[checkBoxConfirmerBlock.id] = checkBoxConfirmerBlock;
  blockActions.checkBoxConfirmer.setValidityForBlockId(validators.checkBoxConfirmerBlockValidator(checkBoxConfirmerBlock), checkBoxConfirmerBlock.id);
};

// blocks changed
// --------------
export const checkBoxBlockDidChange = (checkBoxBlock: CheckBoxBlock, blockActions: B1BlockActions) => {
  blocks[checkBoxBlock.id] = checkBoxBlock;
  blockActions.checkBox.setValidityForBlockId(validators.checkBoxBlockValidator(checkBoxBlock), checkBoxBlock.id);
};

export const dropdownBlockDidChange = (dropdownBlock: DropdownBlock, blockActions: B1BlockActions) => {
  blocks[dropdownBlock.id] = dropdownBlock;
  blockActions.dropdown.setValidityForBlockId(validators.dropdownBlockValidator(dropdownBlock), dropdownBlock.id);
};

export const textInputBlockDidChange = (textInputBlock: TextInputBlock, blockActions: B1BlockActions) => {
  blocks[textInputBlock.id] = textInputBlock;
  blockActions.textInput.setValidityForBlockId(validators.textInputBlockValidator(textInputBlock), textInputBlock.id);
};

export const checkBoxConfirmerBlockDidChange = (checkBoxConfirmerBlock: CheckBoxConfirmerBlock, blockActions: B1BlockActions) => {
  blocks[checkBoxConfirmerBlock.id] = checkBoxConfirmerBlock;
  blockActions.checkBoxConfirmer.setValidityForBlockId(validators.checkBoxConfirmerBlockValidator(checkBoxConfirmerBlock), checkBoxConfirmerBlock.id);
};
