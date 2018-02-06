import { BlocksFunctions, BlocksHooks } from "../../../../dynamic-blocks-list/dynamic-blocks-list.module";

import { DatePickerBlock } from "../blocks/date-picker.model";

import { B2BlocksMethods } from "../block-methods/block-methods";

export interface B2BlocksFunctions extends BlocksFunctions {
  (block: DatePickerBlock, methods: B2BlocksMethods): void;
}

export interface B2BlocksHooks extends BlocksHooks {
  [propName: string]: B2BlocksFunctions;
}
