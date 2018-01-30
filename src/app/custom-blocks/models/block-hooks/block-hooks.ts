import { BlocksFunctions, BlocksHooks } from "../../../dynamic-form/dynamic-form.module";

import { B1BlocksFunctions, B1BlocksHooks } from "../../../b1/custom-blocks/b1.module";

import { B2BlocksFunctions, B2BlocksHooks } from "../../../b2/custom-blocks/b2.module";

export interface CustomBlocksFunctions extends BlocksFunctions, B1BlocksFunctions, B2BlocksFunctions {
}

export interface CustomBlocksHooks extends BlocksHooks, B1BlocksHooks, B2BlocksHooks {
  [propName: string]: CustomBlocksFunctions;
}
