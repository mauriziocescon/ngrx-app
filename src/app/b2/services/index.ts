import { B2BlockHooksService } from "./block-hooks.service";
import { B2BlockUtilsService } from "./block-utils.service";

import { B2BlockActionsService } from "./block-actions.service";

import { B2DatePickerActionsService } from "./blocks/date-picker-actions.service";

import { B2DatePickerHooksTriggerService } from "./blocks/date-picker-hooks-trigger.service";

import {
  BLOCK_ACTIONS_TOKEN,
  BLOCK_HOOKS_TOKEN,
  BLOCK_UTILS_TOKEN,
} from "../../instance-detail/instance-detail.module";

export const SERVICES = [
  {provide: BLOCK_HOOKS_TOKEN, useClass: B2BlockHooksService, multi: true},
  {provide: BLOCK_UTILS_TOKEN, useClass: B2BlockUtilsService, multi: true},

  {provide: BLOCK_ACTIONS_TOKEN, useClass: B2BlockActionsService, multi: true},

  B2DatePickerActionsService,

  B2DatePickerHooksTriggerService,
];

export {
  B2DatePickerActionsService,
};
