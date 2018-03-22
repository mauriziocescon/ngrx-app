import {
  CheckBoxBlock,
  DropdownBlock,
  TextInputBlock,
} from '../../instance-detail/instance-detail.module';

import {
  B1BlockActions,
  CheckBoxConfirmerBlock,
} from '../models';

import * as validators from './validations';

// variables
// --------------
const blocks: { [id: string]: CheckBoxBlock | DropdownBlock | TextInputBlock | CheckBoxConfirmerBlock } = {};

// blocks loaded
// --------------
export const checkBoxBlockDidLoad = (checkBoxBlock: CheckBoxBlock, blockActions: B1BlockActions) => {
  blocks[checkBoxBlock.id] = checkBoxBlock;

  const valid = validators.checkBoxBlockValidator(checkBoxBlock);
  if (valid !== checkBoxBlock.valid) {
    blockActions.checkBox.setValidityForBlockId(valid, checkBoxBlock.id);
  }
};

export const dropdownBlockDidLoad = (dropdownBlock: DropdownBlock, blockActions: B1BlockActions) => {
  blocks[dropdownBlock.id] = dropdownBlock;

  const valid = validators.dropdownBlockValidator(dropdownBlock);
  if (valid !== dropdownBlock.valid) {
    blockActions.dropdown.setValidityForBlockId(valid, dropdownBlock.id);
  }
};

export const textInputBlockDidLoad = (textInputBlock: TextInputBlock, blockActions: B1BlockActions) => {
  blocks[textInputBlock.id] = textInputBlock;

  const valid = validators.textInputBlockValidator(textInputBlock);
  if (valid !== textInputBlock.valid) {
    blockActions.textInput.setValidityForBlockId(valid, textInputBlock.id);
  }
};

export const checkBoxConfirmerBlockDidLoad = (checkBoxConfirmerBlock: CheckBoxConfirmerBlock, blockActions: B1BlockActions) => {
  blocks[checkBoxConfirmerBlock.id] = checkBoxConfirmerBlock;

  const valid = validators.checkBoxConfirmerBlockValidator(checkBoxConfirmerBlock);
  if (valid !== checkBoxConfirmerBlock.valid) {
    blockActions.checkBoxConfirmer.setValidityForBlockId(valid, checkBoxConfirmerBlock.id);
  }
};

// blocks changed
// --------------
export const checkBoxBlockDidChange = (checkBoxBlock: CheckBoxBlock, blockActions: B1BlockActions) => {
  blocks[checkBoxBlock.id] = checkBoxBlock;

  const valid = validators.checkBoxBlockValidator(checkBoxBlock);
  if (valid !== checkBoxBlock.valid) {
    blockActions.checkBox.setValidityForBlockId(valid, checkBoxBlock.id);
  }
};

export const dropdownBlockDidChange = (dropdownBlock: DropdownBlock, blockActions: B1BlockActions) => {
  blocks[dropdownBlock.id] = dropdownBlock;

  const valid = validators.dropdownBlockValidator(dropdownBlock);
  if (valid !== dropdownBlock.valid) {
    blockActions.dropdown.setValidityForBlockId(valid, dropdownBlock.id);
  }
};

export const textInputBlockDidChange = (textInputBlock: TextInputBlock, blockActions: B1BlockActions) => {
  blocks[textInputBlock.id] = textInputBlock;

  const valid = validators.textInputBlockValidator(textInputBlock);
  if (valid !== textInputBlock.valid) {
    blockActions.textInput.setValidityForBlockId(valid, textInputBlock.id);
  }
};

export const checkBoxConfirmerBlockDidChange = (checkBoxConfirmerBlock: CheckBoxConfirmerBlock, blockActions: B1BlockActions) => {
  blocks[checkBoxConfirmerBlock.id] = checkBoxConfirmerBlock;

  const valid = validators.checkBoxConfirmerBlockValidator(checkBoxConfirmerBlock);
  if (valid !== checkBoxConfirmerBlock.valid) {
    blockActions.checkBoxConfirmer.setValidityForBlockId(valid, checkBoxConfirmerBlock.id);
  }
};
