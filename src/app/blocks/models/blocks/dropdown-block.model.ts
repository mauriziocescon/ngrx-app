import { Block } from '../../../shared/shared.module';

export interface DropdownBlock extends Block {
  label: string;
  value?: string;
  choices: string[];
  required: boolean;
  disabled: boolean;
  valid: boolean;
}
