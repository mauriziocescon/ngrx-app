import { Block } from "../block.model";

export interface DropdownBlock extends Block {
  label: string;
  value: string;
  choices: string[];
}
