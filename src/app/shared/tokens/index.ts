import { InjectionToken } from '@angular/core';

import { Block } from '../models';

export const BLOCK_UTILS_TOKEN = new InjectionToken<IBlockUtils>('BlockUtilsService');

export interface IBlockUtils {
  getComponentForBlock(block: Block): any;
}
