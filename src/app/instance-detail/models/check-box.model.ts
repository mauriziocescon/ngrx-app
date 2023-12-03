import { Block } from '../../shared';

export interface CheckBoxBlock extends Block {
  label: string;
  value?: boolean;
  description: string;
  required: boolean;
  disabled: boolean;
}
