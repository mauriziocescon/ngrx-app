import { InstanceDetailGuard } from "./instance-detail/instance-detail-guard.service";
import { RulesResolve } from "./instance-detail/instance-detail-resolve.service";

import { BlocksActionsService } from "./instance-detail/list/blocks/block-actions.service";
import { BlockListService } from "./instance-detail/list/list.service";
import { BlockHooksService } from "./instance-detail/list/hooks.service";
import { BlockUtilsService } from "./instance-detail/list/utils.service";

import { BlockHooksTriggerService } from "./instance-detail/list/blocks/block-hooks-trigger.service";

import { CheckBoxActionsService } from "./instance-detail/list/blocks/check-box-actions.service";
import { DropdownActionsService } from "./instance-detail/list/blocks/dropdown-actions.service";
import { TextInputActionsService } from "./instance-detail/list/blocks/text-input-actions.service";

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
