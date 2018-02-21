import { Block } from "../../../instance-detail/instance-detail.module";

export interface CheckBoxConfirmerBlock extends Block {
  label?: string;
  value?: boolean;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  valid?: boolean;
  hooks?: CheckBoxConfirmerBlockHooks;
}

interface CheckBoxConfirmerBlockHooks {
  checkBoxConfirmerBlockDidLoad: string;
  checkBoxConfirmerBlockDidChange: string;
}
