import { InjectionToken } from '@angular/core';

import { IInstanceDetailStore } from './store';

export { IInstanceDetailStore };
export const INSTANCE_DETAIL_STORE_TOKEN = new InjectionToken<IInstanceDetailStore>('InstanceDetailStoreService');
