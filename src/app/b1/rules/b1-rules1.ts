import {
  CheckBoxBlock,
  DropdownBlock,
  TextInputBlock,
} from "../../instance-detail/instance-detail.module";

import {
  B1BlockActions,
  CheckBoxConfirmerBlock,
} from "../models";

import * as utilities from "./utils/utilities";
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
  blockActions.textInput.setValueForBlockId("Reset initial value during TextInput load event", textInputBlock.id);
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

  const textInputBlockIndex = utilities.arrayOfTextInputBlocksFromBlocksObject(blocks)[0].id;
  if (checkBoxBlock.value === true && textInputBlockIndex) {
    blockActions.textInput.setValueForBlockId(`When checkbox is true, reset to ${new Date().getTime()}`, textInputBlockIndex);
  }
};

export const dropdownBlockDidChange = (dropdownBlock: DropdownBlock, blockActions: B1BlockActions) => {
  blocks[dropdownBlock.id] = dropdownBlock;
  blockActions.dropdown.setValidityForBlockId(validators.dropdownBlockValidator(dropdownBlock), dropdownBlock.id);

  blockActions.dropdown.changeLoading(true, dropdownBlock.id);
  setTimeout(() => {
    const newChoices = ["1", "2", "3", "4", "5"];
    blockActions.dropdown.setChoicesForBlockId(newChoices, dropdownBlock.id);
    blockActions.dropdown.changeLoading(false, dropdownBlock.id);
  }, 3000);
};

export const textInputBlockDidChange = (textInputBlock: TextInputBlock, blockActions: B1BlockActions) => {
  blocks[textInputBlock.id] = textInputBlock;
  blockActions.textInput.setValidityForBlockId(validators.textInputBlockValidator(textInputBlock), textInputBlock.id);
};

export const checkBoxConfirmerBlockDidChange = (checkBoxConfirmerBlock: CheckBoxConfirmerBlock, blockActions: B1BlockActions) => {
  blocks[checkBoxConfirmerBlock.id] = checkBoxConfirmerBlock;
  blockActions.checkBoxConfirmer.setValidityForBlockId(validators.checkBoxConfirmerBlockValidator(checkBoxConfirmerBlock), checkBoxConfirmerBlock.id);
};

export const customCheckBoxBlockDidChange = (checkBoxBlock: CheckBoxBlock, blockActions: B1BlockActions) => {
  blocks[checkBoxBlock.id] = checkBoxBlock;
  blockActions.checkBox.setValidityForBlockId(validators.checkBoxBlockValidator(checkBoxBlock), checkBoxBlock.id);

  if (checkBoxBlock.value === true) {
    alert("Hello world!");
  }
};
