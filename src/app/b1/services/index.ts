import { B1BlockHooksService } from './block-hooks.service';
import { B1BlockUtilsService } from './block-utils.service';
import { B1InstanceDetailStoreService } from './instance-detail-store.service';

import {
  BLOCK_HOOKS_TOKEN,
  BLOCK_UTILS_TOKEN,
  INSTANCE_DETAIL_STORE_TOKEN,
} from '../../instance-detail/instance-detail.module';

export const SERVICES = [
  { provide: BLOCK_HOOKS_TOKEN, useClass: B1BlockHooksService, multi: true },
  { provide: BLOCK_UTILS_TOKEN, useClass: B1BlockUtilsService, multi: true },
  { provide: INSTANCE_DETAIL_STORE_TOKEN, useClass: B1InstanceDetailStoreService, multi: true },
];
