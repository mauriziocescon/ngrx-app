import { B1BlocksMethods } from "../../../b1/b1.module";
import { B2BlocksMethods } from "../../../b2/b2.module";

export type CustomBlocksMethods =
  B1BlocksMethods |
  B2BlocksMethods;
