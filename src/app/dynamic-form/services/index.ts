import { BlocksListService } from "./list.service";
import { BlockHooksService } from "./hooks.service";
import { BlockRulesService } from "./rules.service";
import { BlockUtilsService } from "./utils.service";

import { CheckBoxService } from "./blocks/check-box.service";
import { DropdownService } from "./blocks/dropdown.service";
import { TextInputService } from "./blocks/text-input.service";

export const SERVICES = [
  BlocksListService,
  BlockHooksService,
  BlockRulesService,
  BlockUtilsService,
  CheckBoxService,
  DropdownService,
  TextInputService,
];

export {
  BlocksListService,
  BlockHooksService,
  BlockRulesService,
  BlockUtilsService,
  CheckBoxService,
  DropdownService,
  TextInputService,
};
