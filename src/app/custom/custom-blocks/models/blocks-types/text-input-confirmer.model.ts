import { Block } from "../../../../base/dynamic-form/dynamic-form.module";

export interface TextInputConfirmerBlock extends Block {
  label?: string;
  value?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  disabled?: boolean;
  valid?: boolean;
}
