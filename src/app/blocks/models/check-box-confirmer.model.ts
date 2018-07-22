import { Block } from '../../shared/shared.module';

export interface CheckBoxConfirmerBlock extends Block {
  label: string;
  value?: boolean;
  description: string;
  required: boolean;
  disabled: boolean;
  valid: boolean;
}
