import { CheckBoxBlock } from "../blocks/check-box.model";
import { DropdownBlock } from "../blocks/dropdown-block.model";
import { TextInputBlock } from "../blocks/text-input.model";

import { BlocksMethods } from "../block-methods/block-methods";

export interface BlocksFunctions {
  (block: CheckBoxBlock, methods: BlocksMethods): void;
  (block: DropdownBlock, methods: BlocksMethods): void;
  (block: TextInputBlock, methods: BlocksMethods): void;
}

export interface BlocksHooks {
  [propName: string]: BlocksFunctions;
}
