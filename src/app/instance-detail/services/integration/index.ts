import { BlockActionsIntegrationService } from "./actions.service";
import { BlockHooksIntegrationService } from "./hooks.service";
import { BlockUtilsIntegrationService } from "./utils.service";

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
