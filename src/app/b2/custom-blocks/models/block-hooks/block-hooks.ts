import { BlocksFunctions, BlocksHooks } from "../../../../dynamic-form/dynamic-form.module";

import { CheckBoxConfirmerBlock } from "../blocks/check-box-confirmer.model";

import { B2BlocksMethods } from "../block-methods/block-methods";

export interface B2BlocksFunctions extends BlocksFunctions {
  (block: CheckBoxConfirmerBlock, methods: B2BlocksMethods): void;
}

export interface B2BlocksHooks extends BlocksHooks {
  [propName: string]: B2BlocksFunctions;
}
