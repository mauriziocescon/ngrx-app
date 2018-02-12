import { BlocksFunctions, BlocksHooks } from "../../../../dynamic-block-list/dynamic-block-list.module";

import { CheckBoxConfirmerBlock } from "../blocks/check-box-confirmer.model";

import { B1BlocksMethods } from "../block-methods/block-methods";

export interface B1BlocksFunctions extends BlocksFunctions {
  (block: CheckBoxConfirmerBlock, methods: B1BlocksMethods): void;
}

export interface B1BlocksHooks extends BlocksHooks {
  [propName: string]: B1BlocksFunctions;
}
