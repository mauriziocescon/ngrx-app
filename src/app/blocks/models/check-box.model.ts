import { Block } from '../../shared/shared.module';

export interface CheckBoxBlock extends Block {
  label: string;
  value?: boolean;
  description: string;
  required: boolean;
  disabled: boolean;
  valid: boolean;
}
