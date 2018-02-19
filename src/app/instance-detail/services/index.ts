import { InstanceDetailGuard } from "./instance-detail-guard.service";
import { RulesResolve } from "./instance-detail-resolve.service";

import { BlockListService } from "./list/list.service";
import { BlockHooksService } from "./list/hooks.service";
import { BlockUtilsService } from "./list/utils.service";

import { CheckBoxActionsService } from "./list/blocks/check-box-actions.service";
import { DropdownActionsService } from "./list/blocks/dropdown-actions.service";
import { TextInputActionsService } from "./list/blocks/text-input-actions.service";

export const SERVICES = [
  InstanceDetailGuard,
  RulesResolve,

  BlockHooksService,
  BlockListService,
  BlockUtilsService,

  CheckBoxActionsService,
  DropdownActionsService,
  TextInputActionsService,
];

export {
  InstanceDetailGuard,
  RulesResolve,

  BlockListService,
  BlockHooksService,
  BlockUtilsService,

  CheckBoxActionsService,
  DropdownActionsService,
  TextInputActionsService,
};
