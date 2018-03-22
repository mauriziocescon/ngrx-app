import { Block } from '../block.model';

export interface CheckBoxBlock extends Block {
  label: string;
  value?: boolean;
  description: string;
  required: boolean;
  disabled: boolean;
  valid: boolean;
  hooks: CheckBoxBlockHooks;
}

interface CheckBoxBlockHooks {
  checkBoxBlockDidLoad?: string;
  checkBoxBlockDidChange?: string;
}
