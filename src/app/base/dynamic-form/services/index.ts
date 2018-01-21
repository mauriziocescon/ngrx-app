import { BlocksListService } from "./list.service";
import { BlockUtilsService } from "./utils.service";

import { CheckBoxService } from "./blocks/check-box.service";
import { DropdownService } from "./blocks/dropdown.service";
import { TextInputService } from "./blocks/text-input.service";

export const SERVICES = [
  BlocksListService,
  BlockUtilsService,
  CheckBoxService,
  DropdownService,
  TextInputService,
];

export {
  BlocksListService,
  BlockUtilsService,
  CheckBoxService,
  DropdownService,
  TextInputService,
};
