import { Block } from "../../../../dynamic-blocks-list/dynamic-blocks-list.module";

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
