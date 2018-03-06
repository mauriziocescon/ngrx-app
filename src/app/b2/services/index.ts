import { B2BlockActionsService } from "./block-actions.service";
import { B2BlockHooksService } from "./block-hooks.service";
import { B2BlockUtilsService } from "./block-utils.service";
import { B2InstanceDetailStoreService } from "./instance-detail-store.service";

import { B2DatePickerActionsService } from "./blocks/date-picker/date-picker-actions.service";

import { B2DatePickerHooksTriggerService } from "./blocks/date-picker/date-picker-hooks-trigger.service";

import {
  BLOCK_ACTIONS_TOKEN,
  BLOCK_HOOKS_TOKEN,
  BLOCK_UTILS_TOKEN,
  INSTANCE_DETAIL_STORE_TOKEN,
} from "../../instance-detail/instance-detail.module";

export const SERVICES = [
  {provide: BLOCK_ACTIONS_TOKEN, useClass: B2BlockActionsService, multi: true},
  {provide: BLOCK_HOOKS_TOKEN, useClass: B2BlockHooksService, multi: true},
  {provide: BLOCK_UTILS_TOKEN, useClass: B2BlockUtilsService, multi: true},
  {provide: INSTANCE_DETAIL_STORE_TOKEN, useClass: B2InstanceDetailStoreService, multi: true},

  B2DatePickerActionsService,

  B2DatePickerHooksTriggerService,
];

export {
  B2DatePickerHooksTriggerService,
};
