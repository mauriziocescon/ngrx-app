import { Block } from '../../../shared/shared.module';

export interface DatePickerBlock extends Block {
  label: string;
  value?: string;
  description: string;
  required: boolean;
  disabled: boolean;
}
