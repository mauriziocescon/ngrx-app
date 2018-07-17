import { InjectionToken } from '@angular/core';

import { IBlockHooks } from './hooks';
import { IInstanceDetailStore } from './store';
import { IBlockUtils } from './utils';

export { IBlockHooks };
export const BLOCK_HOOKS_TOKEN = new InjectionToken<IBlockHooks>('BlockHooksService');

export { IInstanceDetailStore };
export const INSTANCE_DETAIL_STORE_TOKEN = new InjectionToken<IInstanceDetailStore>('InstanceDetailStoreService');

export { IBlockUtils };
export const BLOCK_UTILS_TOKEN = new InjectionToken<IBlockUtils>('BlockUtilsService');
