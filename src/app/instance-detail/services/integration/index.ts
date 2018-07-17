import { BlockHooksIntegrationService } from './block-hooks.service';
import { BlockUtilsIntegrationService } from './block-utils.service';
import { InstanceDetailIntegrationStoreService } from './instance-detail-store.service';

export const INTEGRATION_SERVICES = [
  BlockHooksIntegrationService,
  BlockUtilsIntegrationService,
  InstanceDetailIntegrationStoreService,
];

export {
  BlockHooksIntegrationService,
  BlockUtilsIntegrationService,
  InstanceDetailIntegrationStoreService,
};
