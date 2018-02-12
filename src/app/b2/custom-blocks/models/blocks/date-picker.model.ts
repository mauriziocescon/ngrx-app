import { Block } from "../../../../dynamic-block-list/dynamic-block-list.module";

export interface DatePickerBlock extends Block {
  label?: string;
  value?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  valid?: boolean;
  hooks?: DatePickerBlockHooks;
}

interface DatePickerBlockHooks {
  datePickerBlockDidLoad: string;
  datePickerBlockDidChange: string;
}
