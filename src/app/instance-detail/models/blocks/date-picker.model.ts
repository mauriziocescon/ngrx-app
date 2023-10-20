import { Block } from '../../../shared';

export interface DatePickerBlock extends Block {
  label: string;
  value?: string;
  description: string;
  required: boolean;
  disabled: boolean;
}
