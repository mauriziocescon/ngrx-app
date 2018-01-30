import {
  CheckBoxBlock,
  DropdownBlock,
  TextInputBlock,
} from "../../dynamic-form/dynamic-form.module";

import {
  B1BlocksMethods,
  CheckBoxConfirmerBlock,
} from "../custom-blocks/b1.module";

import * as utilities from "./utils/utilities";
import * as validators from "./validations"

// variables
// --------------
const blocks: { [id: string]: CheckBoxBlock | DropdownBlock | TextInputBlock | CheckBoxConfirmerBlock } = {};

// blocks loaded
// --------------
export const checkBoxBlockDidLoad = (checkBoxBlock: CheckBoxBlock, blocksMethods: B1BlocksMethods) => {
  blocks[checkBoxBlock.id] = checkBoxBlock;
  blocksMethods.checkBox.setValidityForBlockId(validators.checkBoxBlockValidator(checkBoxBlock), checkBoxBlock.id);
};

export const dropdownBlockDidLoad = (dropdownBlock: DropdownBlock, blocksMethods: B1BlocksMethods) => {
  blocks[dropdownBlock.id] = dropdownBlock;
  blocksMethods.dropdown.setValidityForBlockId(validators.dropdownBlockValidator(dropdownBlock), dropdownBlock.id);
};

export const textInputBlockDidLoad = (textInputBlock: TextInputBlock, blocksMethods: B1BlocksMethods) => {
  blocks[textInputBlock.id] = textInputBlock;
  blocksMethods.textInput.setValueForBlockId("Reset initial value during TextInput load event", textInputBlock.id);
  blocksMethods.textInput.setValidityForBlockId(validators.textInputBlockValidator(textInputBlock), textInputBlock.id);
};

export const checkBoxConfirmerBlockDidLoad = (checkBoxConfirmerBlock: CheckBoxConfirmerBlock, blocksMethods: B1BlocksMethods) => {
  blocks[checkBoxConfirmerBlock.id] = checkBoxConfirmerBlock;
  blocksMethods.checkBoxConfirmer.setValidityForBlockId(validators.checkBoxConfirmerBlockValidator(checkBoxConfirmerBlock), checkBoxConfirmerBlock.id);
};

// blocks changed
// --------------
export const checkBoxBlockDidChange = (checkBoxBlock: CheckBoxBlock, blocksMethods: B1BlocksMethods) => {
  blocks[checkBoxBlock.id] = checkBoxBlock;
  blocksMethods.checkBox.setValidityForBlockId(validators.checkBoxBlockValidator(checkBoxBlock), checkBoxBlock.id);

  const textInputBlockIndex = utilities.arrayOfTextInputBlocksFromBlocksObject(blocks)[0].id;
  if (checkBoxBlock.value === true && textInputBlockIndex) {
    blocksMethods.textInput.setValueForBlockId(`When checkbox is true, reset to ${new Date().getTime()}`, textInputBlockIndex);
  }
};

export const dropdownBlockDidChange = (dropdownBlock: DropdownBlock, blocksMethods: B1BlocksMethods) => {
  blocks[dropdownBlock.id] = dropdownBlock;
  blocksMethods.dropdown.setValidityForBlockId(validators.dropdownBlockValidator(dropdownBlock), dropdownBlock.id);

  blocksMethods.dropdown.changeLoading(true, dropdownBlock.id);
  setTimeout(() => {
    const newChoices = dropdownBlock.choices.concat(["4", "5"]);
    blocksMethods.dropdown.setChoicesForBlockId(newChoices, dropdownBlock.id);
    blocksMethods.dropdown.changeLoading(false, dropdownBlock.id);
  }, 3000);
};

export const textInputBlockDidChange = (textInputBlock: TextInputBlock, blocksMethods: B1BlocksMethods) => {
  blocks[textInputBlock.id] = textInputBlock;
  blocksMethods.textInput.setValidityForBlockId(validators.textInputBlockValidator(textInputBlock), textInputBlock.id);
};

export const checkBoxConfirmerBlockDidChange = (checkBoxConfirmerBlock: CheckBoxConfirmerBlock, blocksMethods: B1BlocksMethods) => {
  blocks[checkBoxConfirmerBlock.id] = checkBoxConfirmerBlock;
  blocksMethods.checkBoxConfirmer.setValidityForBlockId(validators.checkBoxConfirmerBlockValidator(checkBoxConfirmerBlock), checkBoxConfirmerBlock.id);
};

export const customCheckBoxBlockDidChange = (checkBoxBlock: CheckBoxBlock, blocksMethods: B1BlocksMethods) => {
  blocks[checkBoxBlock.id] = checkBoxBlock;
  blocksMethods.checkBox.setValidityForBlockId(validators.checkBoxBlockValidator(checkBoxBlock), checkBoxBlock.id);

  if (checkBoxBlock.value === true) {
    alert("Hello world!");
  }
};
