import { CheckBoxBlock, DropdownBlock, TextInputBlock } from "../../../instance-detail/instance-detail.module";
import { B4BlockType, DossierBlock } from "../../models";

export const arrayOfBlocksFromBlocksObject = (blocks: { [id: string]: CheckBoxBlock | DropdownBlock | TextInputBlock | DossierBlock }) => {
  const keys = Object.keys(blocks);
  return keys.map((key: string) => {
    return blocks[key];
  });
};

export const arrayOfCheckBoxBlocksFromBlocksObject = (blocks: { [id: string]: CheckBoxBlock | DropdownBlock | TextInputBlock }) => {
  return arrayOfBlocksFromBlocksObject(blocks).filter((block: CheckBoxBlock | DropdownBlock | TextInputBlock) => {
    return block.type === B4BlockType.CheckBox;
  });
};

export const arrayOfDropdownBlocksFromBlocksObject = (blocks: { [id: string]: CheckBoxBlock | DropdownBlock | TextInputBlock }) => {
  return arrayOfBlocksFromBlocksObject(blocks).filter((block: CheckBoxBlock | DropdownBlock | TextInputBlock) => {
    return block.type === B4BlockType.Dropdown;
  });
};

export const arrayOfTextInputBlocksFromBlocksObject = (blocks: { [id: string]: CheckBoxBlock | DropdownBlock | TextInputBlock }) => {
  return arrayOfBlocksFromBlocksObject(blocks).filter((block: CheckBoxBlock | DropdownBlock | TextInputBlock) => {
    return block.type === B4BlockType.TextInput;
  });
};

export const arrayOfDossierBlocksFromBlocksObject = (blocks: { [id: string]: CheckBoxBlock | DropdownBlock | TextInputBlock | DossierBlock }) => {
  return arrayOfBlocksFromBlocksObject(blocks).filter((block: CheckBoxBlock | DropdownBlock | TextInputBlock | DossierBlock) => {
    return block.type === B4BlockType.Dossier;
  });
};
