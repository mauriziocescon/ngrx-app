import { B1BlockHooksService } from "./hooks.service";
import { B1BlockUtilsService } from "./utils.service";

import { B1BlocksActionsService } from "./blocks/block-actions.service";
import { B1BlockHooksTriggerService } from "./blocks/block-hooks-trigger.service";
import { CheckBoxConfirmerActionsService } from "./blocks/check-box-confirmer-actions.service";

export const SERVICES = [
  B1BlockHooksService,
  B1BlockUtilsService,

  B1BlocksActionsService,
  B1BlockHooksTriggerService,
  CheckBoxConfirmerActionsService,
];

export {
  B1BlockHooksService,
  B1BlockUtilsService,

  B1BlocksActionsService,
  B1BlockHooksTriggerService,
  CheckBoxConfirmerActionsService,
};
