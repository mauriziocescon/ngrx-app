import { Block } from "../block.model";

export interface DropdownBlock extends Block {
  label: string;
  value: string;
  choices: string[];
  required: boolean;
  disabled: boolean;
  valid: boolean;
  hooks?: DropdownBlockHooks;
}

interface DropdownBlockHooks {
  dropdownBlockDidLoad?: string;
  dropdownBlockDidChange?: string;
}
