import { Block } from '../../shared';

export interface CheckBoxConfirmerBlock extends Block {
  label: string;
  value?: boolean;
  description: string;
  required: boolean;
  disabled: boolean;
}
