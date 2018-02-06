import { BlockType, CheckBoxBlock, DropdownBlock, TextInputBlock } from "../../../dynamic-blocks-list/dynamic-blocks-list.module";

export const arrayOfBlocksFromBlocksObject = (blocks: { [id: string]: CheckBoxBlock | DropdownBlock | TextInputBlock }) => {
  const keys = Object.keys(blocks);
  return keys.map((key: string) => {
    return blocks[key];
  });
};

export const arrayOfCheckBoxBlocksFromBlocksObject = (blocks: { [id: string]: CheckBoxBlock | DropdownBlock | TextInputBlock }) => {
  return arrayOfBlocksFromBlocksObject(blocks).filter((block: CheckBoxBlock | DropdownBlock | TextInputBlock) => {
    return block.type = BlockType.CheckBox;
  });
};

export const arrayOfDropdownBlocksFromBlocksObject = (blocks: { [id: string]: CheckBoxBlock | DropdownBlock | TextInputBlock }) => {
  return arrayOfBlocksFromBlocksObject(blocks).filter((block: CheckBoxBlock | DropdownBlock | TextInputBlock) => {
    return block.type = BlockType.Dropdown;
  });
};

export const arrayOfTextInputBlocksFromBlocksObject = (blocks: { [id: string]: CheckBoxBlock | DropdownBlock | TextInputBlock }) => {
  return arrayOfBlocksFromBlocksObject(blocks).filter((block: CheckBoxBlock | DropdownBlock | TextInputBlock) => {
    return block.type = BlockType.TextInput;
  });
};
