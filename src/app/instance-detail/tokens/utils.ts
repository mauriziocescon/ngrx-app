import { Block } from "../models";

export interface IBlockUtils {
  key: string;
  getComponentForBlock(block: Block): any;
  triggerComponentDidLoad(block: Block): boolean;
}
