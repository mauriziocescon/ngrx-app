import { BlockListService } from "./list.service";
import { BlockHooksService } from "./hooks.service";
import { BlockRulesService } from "./rules.service";
import { BlockUtilsService } from "./utils.service";

import { CheckBoxService } from "./blocks/check-box.service";
import { DropdownService } from "./blocks/dropdown.service";
import { TextInputService } from "./blocks/text-input.service";

export const SERVICES = [
  BlockHooksService,
  BlockListService,
  BlockRulesService,
  BlockUtilsService,
  CheckBoxService,
  DropdownService,
  TextInputService,
];

export {
  BlockHooksService,
  BlockRulesService,
  BlockListService,
  BlockUtilsService,
  CheckBoxService,
  DropdownService,
  TextInputService,
};
