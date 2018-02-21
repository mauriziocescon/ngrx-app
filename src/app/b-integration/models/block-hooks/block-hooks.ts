import { B1BlocksFunctions, B1BlocksHooks } from "../../../b1/b1.module";
import { B2BlocksFunctions, B2BlocksHooks } from "../../../b2/b2.module";

export type CustomBlocksFunctions =
  B1BlocksFunctions |
  B2BlocksFunctions;

export type CustomBlocksHooks =
  B1BlocksHooks |
  B2BlocksHooks;
