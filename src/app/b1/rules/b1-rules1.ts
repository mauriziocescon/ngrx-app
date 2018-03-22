import {
  CheckBoxBlock,
  DropdownBlock,
  TextInputBlock,
} from '../../instance-detail/instance-detail.module';

import {
  B1BlockActions,
  CheckBoxConfirmerBlock,
} from '../models';

import * as utilities from './utils/utilities';
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

  blockActions.textInput.setValueForBlockId('Reset initial value during TextInput load event', textInputBlock.id);

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

  // change first textInput params
  const firstTextInputBlock = utilities.arrayOfTextInputBlocksFromBlocksObject(blocks)[0];
  const textInputBlockIndex = firstTextInputBlock ? firstTextInputBlock.id : undefined;
  if (checkBoxBlock.value === true && textInputBlockIndex) {
    blockActions.textInput.setValueForBlockId(`When checkbox is true, reset to ${new Date().getTime()}`, textInputBlockIndex);
    blockActions.textInput.setRequiredForBlockId(true, textInputBlockIndex);
    blockActions.textInput.setMaxLengthForBlockId(20, textInputBlockIndex);
  }

  // change first dropdown params
  const firstDropdownBlock = utilities.arrayOfDropdownBlocksFromBlocksObject(blocks)[0];
  const dropdownBlockIndex = firstDropdownBlock ? firstDropdownBlock.id : undefined;
  if (dropdownBlockIndex !== undefined) {
    blockActions.dropdown.setDisabledForBlockId(checkBoxBlock.value === false, dropdownBlockIndex);
  }
};

export const dropdownBlockDidChange = (dropdownBlock: DropdownBlock, blockActions: B1BlockActions) => {
  blocks[dropdownBlock.id] = dropdownBlock;

  const valid = validators.dropdownBlockValidator(dropdownBlock);
  if (valid !== dropdownBlock.valid) {
    blockActions.dropdown.setValidityForBlockId(valid, dropdownBlock.id);
  }

  blockActions.dropdown.changeLoading(true, dropdownBlock.id);
  setTimeout(() => {
    const newChoices = ['1', '2', '3', '4', '5'];
    blockActions.dropdown.setChoicesForBlockId(newChoices, dropdownBlock.id);
    blockActions.dropdown.changeLoading(false, dropdownBlock.id);
  }, 3000);
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

export const customCheckBoxBlockDidChange = (checkBoxBlock: CheckBoxBlock, blockActions: B1BlockActions) => {
  blocks[checkBoxBlock.id] = checkBoxBlock;

  const valid = validators.checkBoxBlockValidator(checkBoxBlock);
  if (valid !== checkBoxBlock.valid) {
    blockActions.checkBox.setValidityForBlockId(valid, checkBoxBlock.id);
  }

  if (checkBoxBlock.value === true) {
    alert('Hello world!');
  }
};
