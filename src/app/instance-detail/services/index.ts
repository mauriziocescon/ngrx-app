import { InstanceDetailGuard } from "./instance-detail-guard.service";
import { RulesResolve } from "./instance-detail-resolve.service";

import { BlockListService } from "./list/list.service";
import { BlockHooksService } from "./list/hooks.service";
import { BlockUtilsService } from "./list/utils.service";

import { CheckBoxService } from "./list/blocks/check-box.service";
import { DropdownService } from "./list/blocks/dropdown.service";
import { TextInputService } from "./list/blocks/text-input.service";

export const SERVICES = [
  InstanceDetailGuard,
  RulesResolve,

  BlockHooksService,
  BlockListService,
  BlockUtilsService,

  CheckBoxService,
  DropdownService,
  TextInputService,
];

export {
  InstanceDetailGuard,
  RulesResolve,

  BlockListService,
  BlockHooksService,
  BlockUtilsService,

  CheckBoxService,
  DropdownService,
  TextInputService,
};
