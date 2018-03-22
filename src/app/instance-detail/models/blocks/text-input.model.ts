import { Block } from '../block.model';

export interface TextInputBlock extends Block {
  label: string;
  value?: string;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  disabled: boolean;
  valid: boolean;
  hooks: TextInputBlockHooks;
}

interface TextInputBlockHooks {
  textInputBlockDidLoad?: string;
  textInputBlockDidChange?: string;
}
