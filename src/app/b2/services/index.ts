import { B2BlockHooksService } from "./block-hooks.service";
import { B2BlockUtilsService } from "./block-utils.service";

import { B2BlocksActionsService } from "./block-actions.service";
import { B2BlockHooksTriggerService } from "./blocks/block-hooks-trigger.service";
import { DatePickerActionsService } from "./blocks/date-picker-actions.service";

import {
  BLOCK_ACTIONS_TOKEN,
  BLOCK_HOOKS_TOKEN,
  BLOCK_UTILS_TOKEN,
} from "../../instance-detail/instance-detail.module";

export const SERVICES = [
  {provide: BLOCK_HOOKS_TOKEN, useClass: B2BlockHooksService, multi: true},
  {provide: BLOCK_UTILS_TOKEN, useClass: B2BlockUtilsService, multi: true},

  {provide: BLOCK_ACTIONS_TOKEN, useClass: B2BlocksActionsService, multi: true},
  B2BlockHooksTriggerService,
  DatePickerActionsService,
];

export {
  DatePickerActionsService,
};
