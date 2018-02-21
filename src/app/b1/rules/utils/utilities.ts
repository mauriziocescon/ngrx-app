import { CheckBoxBlock, DropdownBlock, TextInputBlock } from "../../../instance-detail/instance-detail.module";
import { CheckBoxConfirmerBlock, B1BlockType } from "../../models";

export const arrayOfBlocksFromBlocksObject = (blocks: { [id: string]: CheckBoxBlock | DropdownBlock | TextInputBlock | CheckBoxConfirmerBlock }) => {
  const keys = Object.keys(blocks);
  return keys.map((key: string) => {
    return blocks[key];
  });
};

export const arrayOfCheckBoxBlocksFromBlocksObject = (blocks: { [id: string]: CheckBoxBlock | DropdownBlock | TextInputBlock | CheckBoxConfirmerBlock }) => {
  return arrayOfBlocksFromBlocksObject(blocks).filter((block: CheckBoxBlock | DropdownBlock | TextInputBlock | CheckBoxConfirmerBlock) => {
    return block.type === B1BlockType.CheckBox;
  });
};

export const arrayOfDropdownBlocksFromBlocksObject = (blocks: { [id: string]: CheckBoxBlock | DropdownBlock | TextInputBlock | CheckBoxConfirmerBlock }) => {
  return arrayOfBlocksFromBlocksObject(blocks).filter((block: CheckBoxBlock | DropdownBlock | TextInputBlock | CheckBoxConfirmerBlock) => {
    return block.type === B1BlockType.Dropdown;
  });
};

export const arrayOfTextInputBlocksFromBlocksObject = (blocks: { [id: string]: CheckBoxBlock | DropdownBlock | TextInputBlock | CheckBoxConfirmerBlock }) => {
  return arrayOfBlocksFromBlocksObject(blocks).filter((block: CheckBoxBlock | DropdownBlock | TextInputBlock | CheckBoxConfirmerBlock) => {
    return block.type === B1BlockType.TextInput;
  });
};

export const arrayOfCheckBoxConfirmerBlocksFromBlocksObject = (blocks: { [id: string]: CheckBoxBlock | DropdownBlock | TextInputBlock | CheckBoxConfirmerBlock }) => {
  return arrayOfBlocksFromBlocksObject(blocks).filter((block: CheckBoxBlock | DropdownBlock | TextInputBlock | CheckBoxConfirmerBlock) => {
    return block.type === B1BlockType.CheckBoxConfirmer;
  });
};
