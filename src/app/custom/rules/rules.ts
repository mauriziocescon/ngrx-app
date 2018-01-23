import {
  CheckBoxBlock,
  DropdownBlock,
  TextInputBlock,
} from "../../base/dynamic-form/dynamic-form.module";

import { CheckBoxConfirmerBlock } from "../custom-blocks/models";

import { BlocksMethods } from "../hooks/models";

// blocks loaded
// --------------
export const checkBoxBlockDidLoad = (checkBoxBlock: CheckBoxBlock, blocksMethods: BlocksMethods) => {
  // do nothing
};

export const dropdownBlockDidLoad = (dropdownBlock: DropdownBlock, blocksMethods: BlocksMethods) => {
  // do nothing
};

export const textInputBlockDidLoad = (textInputBlock: TextInputBlock, blocksMethods: BlocksMethods) => {
  blocksMethods.textInput.setValueForBlockId("Reset initial value during TextInput load event", textInputBlock.id);
};

export const checkBoxConfirmerBlockDidLoad = (checkBoxConfirmerBlock: CheckBoxConfirmerBlock, blocksMethods: BlocksMethods) => {
  // do nothing
};

// blocks changed
// --------------
export const checkBoxBlockDidChange = (checkBoxBlock: CheckBoxBlock, blocksMethods: BlocksMethods) => {
  if (checkBoxBlock.value === true) {
    blocksMethods.textInput.setValueForBlockId(`When checkbox is true, reset to ${new Date().getTime()}`, 0);
  }
};

export const dropdownBlockDidChange = (dropdownBlock: DropdownBlock, blocksMethods: BlocksMethods) => {
  blocksMethods.textInput.setValueForBlockId(`When dropdown changes, reset to ${new Date().getTime()}`, 0);

  blocksMethods.dropdown.changeLoading(true, dropdownBlock.id);
  setTimeout(() => {
    const newChoices = dropdownBlock.choices.concat(["4", "5"]);
    blocksMethods.dropdown.setChoicesForBlockId(newChoices, dropdownBlock.id);
    blocksMethods.dropdown.changeLoading(false, dropdownBlock.id);
  }, 3000);
};

export const textInputBlockDidChange = (textInputBlock: TextInputBlock, blocksMethods: BlocksMethods) => {
  // do nothing
};

export const checkBoxConfirmerBlockDidChange = (checkBoxConfirmerBlock: CheckBoxConfirmerBlock, blocksMethods: BlocksMethods) => {
  // do nothing
};
