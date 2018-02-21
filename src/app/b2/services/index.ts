import { B2BlockHooksService } from "./hooks.service";
import { B2BlockUtilsService } from "./utils.service";

import { B2BlocksActionsService } from "./blocks/block-actions.service";
import { B2BlockHooksTriggerService } from "./blocks/block-hooks-trigger.service";
import { DatePickerActionsService } from "./blocks/date-picker-actions.service";

import { BLOCK_HOOKS_TOKEN } from "../../instance-detail/instance-detail.module";

export const SERVICES = [
  {provide: BLOCK_HOOKS_TOKEN, useClass: B2BlockHooksService, multi: true},
  B2BlockUtilsService,

  B2BlocksActionsService,
  B2BlockHooksTriggerService,
  DatePickerActionsService,
];

export {
  B2BlockUtilsService,

  B2BlocksActionsService,
  B2BlockHooksTriggerService,
  DatePickerActionsService,
};
