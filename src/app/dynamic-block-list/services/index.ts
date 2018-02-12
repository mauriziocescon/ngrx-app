import { BlockListService } from "./list.service";
import { ListGuard } from "./list-guard.service";
import { BlockHooksService } from "./hooks.service";
import { BlockUtilsService } from "./utils.service";

import { CheckBoxService } from "./blocks/check-box.service";
import { DropdownService } from "./blocks/dropdown.service";
import { TextInputService } from "./blocks/text-input.service";

export const SERVICES = [
  BlockHooksService,
  BlockListService,
  ListGuard,
  BlockUtilsService,

  CheckBoxService,
  DropdownService,
  TextInputService,
];

export {
  BlockHooksService,
  BlockListService,
  ListGuard,
  BlockUtilsService,

  CheckBoxService,
  DropdownService,
  TextInputService,
};
