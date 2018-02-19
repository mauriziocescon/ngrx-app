import { InstanceDetailGuard } from "./instance-detail-guard.service";
import { RulesResolve } from "./instance-detail-resolve.service";

import { BlockListService } from "./list/list.service";
import { BlockHooksService } from "./list/hooks.service";
import { BlockUtilsService } from "./list/utils.service";

import { CheckBoxActionsService } from "./list/blocks/check-box.service";
import { DropdownActionsService } from "./list/blocks/dropdown.service";
import { TextInputActionsService } from "./list/blocks/text-input.service";

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
