import { Block } from '../../../shared';

export interface TextInputBlock extends Block {
  label: string;
  value?: string;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  disabled: boolean;
}
