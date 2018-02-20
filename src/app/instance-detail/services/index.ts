import { InstanceDetailGuard } from "./instance-detail-guard.service";
import { RulesResolve } from "./instance-detail-resolve.service";

import { BlocksActionsService } from "./list/blocks/block-actions.service";
import { BlockListService } from "./list/list.service";
import { BlockHooksService } from "./list/hooks.service";
import { BlockUtilsService } from "./list/utils.service";

import { BlockHooksTriggerService } from "./list/blocks/block-hooks-trigger.service";

import { CheckBoxActionsService } from "./list/blocks/check-box-actions.service";
import { DropdownActionsService } from "./list/blocks/dropdown-actions.service";
import { TextInputActionsService } from "./list/blocks/text-input-actions.service";

export const SERVICES = [
  InstanceDetailGuard,
  RulesResolve,

  BlocksActionsService,
  BlockHooksService,
  BlockListService,
  BlockUtilsService,

  BlockHooksTriggerService,

  CheckBoxActionsService,
  DropdownActionsService,
  TextInputActionsService,
];

export {
  InstanceDetailGuard,
  RulesResolve,

  BlocksActionsService,
  BlockListService,
  BlockHooksService,
  BlockUtilsService,

  BlockHooksTriggerService,

  CheckBoxActionsService,
  DropdownActionsService,
  TextInputActionsService,
};
