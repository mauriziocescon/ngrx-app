import { CheckBoxBlock, DropdownBlock, TextInputBlock } from "../../dynamic-form/models";

export interface BlocksHooks {
  checkBoxBlockDidLoad: (checkBoxBlock: CheckBoxBlock, blocksMethods: any) => void;
  dropdownBlockDidLoad: (dropdownBlock: DropdownBlock, blocksMethods: any) => void;
  textInputBlockDidLoad: (textInputBlock: TextInputBlock, blocksMethods: any) => void;

  checkBoxBlockDidChange: (checkBoxBlock: CheckBoxBlock, blocksMethods: any) => void;
  dropdownBlockDidChange: (dropdownBlock: DropdownBlock, blocksMethods: any) => void;
  textInputBlockDidChange: (textInputBlock: TextInputBlock, blocksMethods: any) => void;
}
