import { InstanceDetailGuard } from './instance-detail/instance-detail-guard.service';
import { RulesResolve } from './instance-detail/instance-detail-resolve.service';
import { InstanceDetailStoreService } from './instance-detail/instance-detail-store.service';
import { InstanceParamsService } from './instance-detail/instance-params.service';

import { BlockListService } from './instance-detail/list/list.service';
import { BlockUtilsService } from './instance-detail/list/block-utils.service';

import {
  INTEGRATION_SERVICES,
  BlockUtilsIntegrationService,
  InstanceDetailIntegrationStoreService,
} from './integration';

import {
  INSTANCE_DETAIL_STORE_TOKEN,
  BLOCK_UTILS_TOKEN,
} from '../tokens';

export const SERVICES = [
  InstanceDetailGuard,
  RulesResolve,
  { provide: INSTANCE_DETAIL_STORE_TOKEN, useClass: InstanceDetailStoreService, multi: true },
  InstanceParamsService,

  BlockListService,
  { provide: BLOCK_UTILS_TOKEN, useClass: BlockUtilsService, multi: true },

  INTEGRATION_SERVICES,
];

export {
  InstanceDetailGuard,
  RulesResolve,
  InstanceParamsService,

  BlockListService,

  BlockUtilsIntegrationService,
  InstanceDetailIntegrationStoreService,
};
