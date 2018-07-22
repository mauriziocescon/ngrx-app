import { Block } from '../../shared/shared.module';

export interface TextInputBlock extends Block {
  label: string;
  value?: string;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  disabled: boolean;
  valid: boolean;
}
