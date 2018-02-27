import { BlockActionsIntegrationService } from "./block-actions.service";
import { BlockHooksIntegrationService } from "./block-hooks.service";
import { BlockUtilsIntegrationService } from "./block-utils.service";

export const INTEGRATION_SERVICES = [
  BlockActionsIntegrationService,
  BlockHooksIntegrationService,
  BlockUtilsIntegrationService,
];

export {
  BlockActionsIntegrationService,
  BlockHooksIntegrationService,
  BlockUtilsIntegrationService,
}
