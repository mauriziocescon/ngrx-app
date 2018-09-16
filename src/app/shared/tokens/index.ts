import { InjectionToken } from '@angular/core';

import { IBlockUtils } from './utils';

export { IBlockUtils };
export const BLOCK_UTILS_TOKEN = new InjectionToken<IBlockUtils>('BlockUtilsService');
