import { B2BlockUtilsService } from './block-utils.service';
import { B2InstanceDetailStoreService } from './instance-detail-store.service';

import {
  BLOCK_UTILS_TOKEN,
  INSTANCE_DETAIL_STORE_TOKEN,
} from '../../instance-detail/instance-detail.module';

export const SERVICES = [
  { provide: BLOCK_UTILS_TOKEN, useClass: B2BlockUtilsService, multi: true },
  { provide: INSTANCE_DETAIL_STORE_TOKEN, useClass: B2InstanceDetailStoreService, multi: true },
];
