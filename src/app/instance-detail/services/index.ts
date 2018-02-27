import { InstanceDetailGuard } from "./instance-detail/instance-detail-guard.service";
import { RulesResolve } from "./instance-detail/instance-detail-resolve.service";
import { InstanceParamsService } from "./instance-detail/instance-params.service";

import { BlocksActionsService } from "./instance-detail/list/block-actions.service";
import { BlockListService } from "./instance-detail/list/list.service";
import { BlockHooksService } from "./instance-detail/list/block-hooks.service";
import { BlockUtilsService } from "./instance-detail/list/block-utils.service";

import { CheckBoxActionsService } from "./instance-detail/list/blocks/check-box-actions.service";
import { DropdownActionsService } from "./instance-detail/list/blocks/dropdown-actions.service";
import { TextInputActionsService } from "./instance-detail/list/blocks/text-input-actions.service";

import { CheckBoxHooksTriggerService } from "./instance-detail/list/blocks/check-box-hooks-trigger.service";
import { DropdownHooksTriggerService } from "./instance-detail/list/blocks/dropdown-hooks-trigger.service";
import { TextInputHooksTriggerService } from "./instance-detail/list/blocks/text-input-hooks-trigger.service";

import {
  INTEGRATION_SERVICES,
  BlockActionsIntegrationService,
  BlockUtilsIntegrationService,
} from "./integration";

import { BLOCK_ACTIONS_TOKEN, BLOCK_HOOKS_TOKEN, BLOCK_UTILS_TOKEN } from "../tokens";

export const SERVICES = [
  InstanceDetailGuard,
  RulesResolve,
  InstanceParamsService,

  {provide: BLOCK_ACTIONS_TOKEN, useClass: BlocksActionsService, multi: true},
  BlockListService,
  {provide: BLOCK_HOOKS_TOKEN, useClass: BlockHooksService, multi: true},
  {provide: BLOCK_UTILS_TOKEN, useClass: BlockUtilsService, multi: true},

  CheckBoxActionsService,
  DropdownActionsService,
  TextInputActionsService,

  CheckBoxHooksTriggerService,
  DropdownHooksTriggerService,
  TextInputHooksTriggerService,

  INTEGRATION_SERVICES,
];

export {
  InstanceDetailGuard,
  RulesResolve,
  InstanceParamsService,

  BlockListService,
  BlockHooksService,
  BlockUtilsService,

  CheckBoxActionsService,
  DropdownActionsService,
  TextInputActionsService,

  BlockActionsIntegrationService,
  BlockUtilsIntegrationService,
};
