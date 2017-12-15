import { Block } from "../block.model";

export interface CheckBoxBlock extends Block {
  label: string;
  value: boolean;
  description: string;
}
