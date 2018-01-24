import { BlocksFunctions, BlocksHooks } from "../../../dynamic-form/dynamic-form.module";

import { CheckBoxConfirmerBlock } from "../blocks/check-box-confirmer.model";

import { CustomBlocksMethods } from "../block-methods/block-methods";

export interface CustomBlocksFunctions extends BlocksFunctions {
  (block: CheckBoxConfirmerBlock, methods: CustomBlocksMethods): void;
}

export interface CustomBlocksHooks extends BlocksHooks {
  [propName: string]: CustomBlocksFunctions;
}
