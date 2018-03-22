import { Block } from '../models';

export interface IBlockUtils {
  module: string;

  getComponentForBlock(block: Block): any;

  triggerComponentDidLoad(block: Block): boolean;
}
