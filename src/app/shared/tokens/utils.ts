import { Block } from '../models';

export interface IBlockUtils {
  getComponentForBlock(block: Block): any;
}
