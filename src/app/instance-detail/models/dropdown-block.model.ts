import { Block } from '../../shared';

export interface DropdownBlock extends Block {
  label: string;
  value?: string;
  choices: string[];
  required: boolean;
  disabled: boolean;
}
