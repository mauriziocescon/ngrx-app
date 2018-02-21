import { B1BlockHooksService } from "./hooks.service";
import { B1BlockUtilsService } from "./utils.service";

import { B1BlocksActionsService } from "./blocks/block-actions.service";
import { B1BlockHooksTriggerService } from "./blocks/block-hooks-trigger.service";
import { CheckBoxConfirmerActionsService } from "./blocks/check-box-confirmer-actions.service";

import { BLOCK_HOOKS_TOKEN, BLOCK_UTILS_TOKEN } from "../../instance-detail/instance-detail.module";

export const SERVICES = [
  {provide: BLOCK_HOOKS_TOKEN, useClass: B1BlockHooksService, multi: true},
  {provide: BLOCK_UTILS_TOKEN, useClass: B1BlockUtilsService, multi: true},

  B1BlocksActionsService,
  B1BlockHooksTriggerService,
  CheckBoxConfirmerActionsService,
];

export {
  B1BlockUtilsService,

  B1BlocksActionsService,
  B1BlockHooksTriggerService,
  CheckBoxConfirmerActionsService,
};
