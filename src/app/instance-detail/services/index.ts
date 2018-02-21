import { InstanceDetailGuard } from "./instance-detail/instance-detail-guard.service";
import { RulesResolve } from "./instance-detail/instance-detail-resolve.service";
import { InstanceParamsService } from "./instance-detail/instance-params.service";

import { BlocksActionsService } from "./instance-detail/list/blocks/block-actions.service";
import { BlockListService } from "./instance-detail/list/list.service";
import { BlockHooksService } from "./instance-detail/list/hooks.service";
import { BlockUtilsService } from "./instance-detail/list/utils.service";

import { BlockHooksTriggerService } from "./instance-detail/list/blocks/block-hooks-trigger.service";

import { CheckBoxActionsService } from "./instance-detail/list/blocks/check-box-actions.service";
import { DropdownActionsService } from "./instance-detail/list/blocks/dropdown-actions.service";
import { TextInputActionsService } from "./instance-detail/list/blocks/text-input-actions.service";

import { BLOCK_HOOKS_TOKEN } from "../tokens";

export const SERVICES = [
  InstanceDetailGuard,
  RulesResolve,
  InstanceParamsService,

  BlocksActionsService,
  {provide: BLOCK_HOOKS_TOKEN, useClass: BlockHooksService, multi: true},
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
  InstanceParamsService,

  BlocksActionsService,
  BlockListService,
  BlockHooksService,
  BlockUtilsService,

  BlockHooksTriggerService,

  CheckBoxActionsService,
  DropdownActionsService,
  TextInputActionsService,
};
