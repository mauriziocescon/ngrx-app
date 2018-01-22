import { CheckBoxBlock, DropdownBlock, TextInputBlock } from "../../../base/dynamic-form/dynamic-form.module";
import { BlocksMethods } from "./blocks-methods";

import { CheckBoxConfirmerBlock } from "../../custom-blocks/custom-blocks.module";

export interface BlocksHooks {
  checkBoxBlockDidLoad: (checkBoxBlock: CheckBoxBlock, blocksMethods: BlocksMethods) => void;
  dropdownBlockDidLoad: (dropdownBlock: DropdownBlock, blocksMethods: BlocksMethods) => void;
  textInputBlockDidLoad: (textInputBlock: TextInputBlock, blocksMethods: BlocksMethods) => void;

  checkBoxConfirmerBlockDidLoad: (checkBoxConfirmerBlock: CheckBoxConfirmerBlock, blocksMethods: BlocksMethods) => void;

  checkBoxBlockDidChange: (checkBoxBlock: CheckBoxBlock, blocksMethods: BlocksMethods) => void;
  dropdownBlockDidChange: (dropdownBlock: DropdownBlock, blocksMethods: BlocksMethods) => void;
  textInputBlockDidChange: (textInputBlock: TextInputBlock, blocksMethods: BlocksMethods) => void;

  checkBoxConfirmerBlockDidChange: (checkBoxConfirmerBlock: CheckBoxConfirmerBlock, blocksMethods: BlocksMethods) => void;
}
