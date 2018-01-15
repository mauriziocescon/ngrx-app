import {
  CheckBoxBlock,
  DropdownBlock,
  TextInputBlock,
} from "../dynamic-form/models";

import { BlocksMethods } from "../block-hooks/models";

const blocks: { [id: string]: CheckBoxBlock | DropdownBlock | TextInputBlock } = {};

export const checkBoxBlockDidLoad = (checkBoxBlock: CheckBoxBlock, blocksMethods: BlocksMethods) => {
  blocks[checkBoxBlock.id] = checkBoxBlock;
  console.log(`loadCheckBoxBlock: ${JSON.stringify(checkBoxBlock)}`);
};

export const dropdownBlockDidLoad = (dropdownBlock: DropdownBlock, blocksMethods: BlocksMethods) => {
  blocks[dropdownBlock.id] = dropdownBlock;
  console.log(`loadDropdownBlock: ${JSON.stringify(dropdownBlock)}`);
};

export const textInputBlockDidLoad = (textInputBlock: TextInputBlock, blocksMethods: BlocksMethods) => {
  blocks[textInputBlock.id] = textInputBlock;
  console.log(`textInputBlockDidLoad: ${JSON.stringify(textInputBlock)}`);

  blocksMethods.textInput.setValueForBlockId("Reset initial value during TextInput load event", textInputBlock.id);
};

// status changed
export const checkBoxBlockDidChange = (checkBoxBlock: CheckBoxBlock, blocksMethods: BlocksMethods) => {
  console.log(`checkBoxBlockDidChange: ${JSON.stringify(checkBoxBlock)}`);

  if (checkBoxBlock.value === true) {
    blocksMethods.textInput.setValueForBlockId(`When checkbox is true, reset to ${new Date().getTime()}`, 0);
  }
};

export const dropdownBlockDidChange = (dropdownBlock: DropdownBlock, blocksMethods: BlocksMethods) => {
  console.log(`dropdownBlockDidChange: ${JSON.stringify(dropdownBlock)}`);

  blocksMethods.textInput.setValueForBlockId(`When dropdown changes, reset to ${new Date().getTime()}`, 0);

  blocksMethods.dropdown.changeLoading(true, dropdownBlock.id);
  setTimeout(() => {
    const newChoices = (blocks[dropdownBlock.id] as DropdownBlock).choices.concat(["4", "5"]);
    blocksMethods.dropdown.setChoicesForBlockId(newChoices, dropdownBlock.id);
    blocksMethods.dropdown.changeLoading(false, dropdownBlock.id);
  }, 3000);
};

export const textInputBlockDidChange = (textInputBlock: TextInputBlock, blocksMethods: BlocksMethods) => {
  console.log(`textInputBlockDidChange: ${JSON.stringify(textInputBlock)}`);
};
