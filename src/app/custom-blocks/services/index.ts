import { CustomBlockListService } from "./list.service";
import { CustomBlockHooksService } from "./hooks.service";
import { CustomBlockUtilsService } from "./utils.service";

import { CheckBoxConfirmerService } from "./blocks/check-box-confirmer.service";

export const SERVICES = [
  CustomBlockHooksService,
  CustomBlockListService,
  CustomBlockUtilsService,
  CheckBoxConfirmerService,
];

export {
  CustomBlockHooksService,
  CustomBlockListService,
  CustomBlockUtilsService,
  CheckBoxConfirmerService,
};
