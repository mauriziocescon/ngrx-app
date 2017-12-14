import { Block } from "../block.model";

export interface TextInputBlock extends Block {
  label: string;
  value: string;
}
