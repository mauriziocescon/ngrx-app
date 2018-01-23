import { CheckBoxBlock, DropdownBlock, TextInputBlock } from "../../../base/dynamic-form/dynamic-form.module";
import { BlocksMethods } from "./blocks-methods";

import { CheckBoxConfirmerBlock } from "../../custom-blocks/custom-blocks.module";

interface BlocksFunctions {
  (block: CheckBoxBlock, methods: BlocksMethods): void;
  (block: DropdownBlock, methods: BlocksMethods): void;
  (block: TextInputBlock, methods: BlocksMethods): void;
  (block: CheckBoxConfirmerBlock, methods: BlocksMethods): void;
}

export interface BlocksHooks {
  [propName: string]: BlocksFunctions;
}
