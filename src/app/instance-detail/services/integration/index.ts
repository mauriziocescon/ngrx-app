import { BlockActionsIntegrationService } from "./block-actions.service";
import { BlockHooksIntegrationService } from "./block-hooks.service";
import { BlockUtilsIntegrationService } from "./block-utils.service";
import { InstanceDetailIntegrationStoreService } from "./instance-detail-store.service";

export const INTEGRATION_SERVICES = [
  BlockActionsIntegrationService,
  BlockHooksIntegrationService,
  BlockUtilsIntegrationService,
  InstanceDetailIntegrationStoreService,
];

export {
  BlockActionsIntegrationService,
  BlockHooksIntegrationService,
  BlockUtilsIntegrationService,
  InstanceDetailIntegrationStoreService,
}
