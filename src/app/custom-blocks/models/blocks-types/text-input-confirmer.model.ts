import { Block } from "../../../dynamic-form/models";

export interface TextInputConfirmerBlock extends Block {
  label?: string;
  value?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  disabled?: boolean;
  valid?: boolean;
}
