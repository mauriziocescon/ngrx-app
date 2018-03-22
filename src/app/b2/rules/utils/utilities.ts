import { CheckBoxBlock, DropdownBlock, TextInputBlock } from '../../../instance-detail/instance-detail.module';
import { DatePickerBlock, B2BlockType } from '../../models';

export const arrayOfBlocksFromBlocksObject = (blocks: { [id: string]: CheckBoxBlock | DropdownBlock | TextInputBlock | DatePickerBlock }) => {
  const keys = Object.keys(blocks);
  return keys.map((key: string) => {
    return blocks[key];
  });
};

export const arrayOfCheckBoxBlocksFromBlocksObject = (blocks: { [id: string]: CheckBoxBlock | DropdownBlock | TextInputBlock | DatePickerBlock }) => {
  return arrayOfBlocksFromBlocksObject(blocks).filter((block: CheckBoxBlock | DropdownBlock | TextInputBlock | DatePickerBlock) => {
    return block.type === B2BlockType.CheckBox;
  });
};

export const arrayOfDropdownBlocksFromBlocksObject = (blocks: { [id: string]: CheckBoxBlock | DropdownBlock | TextInputBlock | DatePickerBlock }) => {
  return arrayOfBlocksFromBlocksObject(blocks).filter((block: CheckBoxBlock | DropdownBlock | TextInputBlock | DatePickerBlock) => {
    return block.type === B2BlockType.Dropdown;
  });
};

export const arrayOfTextInputBlocksFromBlocksObject = (blocks: { [id: string]: CheckBoxBlock | DropdownBlock | TextInputBlock | DatePickerBlock }) => {
  return arrayOfBlocksFromBlocksObject(blocks).filter((block: CheckBoxBlock | DropdownBlock | TextInputBlock | DatePickerBlock) => {
    return block.type === B2BlockType.TextInput;
  });
};

export const arrayOfDatePickerBlocksFromBlocksObject = (blocks: { [id: string]: CheckBoxBlock | DropdownBlock | TextInputBlock | DatePickerBlock }) => {
  return arrayOfBlocksFromBlocksObject(blocks).filter((block: CheckBoxBlock | DropdownBlock | TextInputBlock | DatePickerBlock) => {
    return block.type === B2BlockType.DatePicker;
  });
};
