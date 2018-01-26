import { B1BlockListService } from "./list.service";
import { B1BlockHooksService } from "./hooks.service";
import { B1BlockUtilsService } from "./utils.service";

import { CheckBoxConfirmerService } from "./blocks/check-box-confirmer.service";

export const SERVICES = [
  B1BlockHooksService,
  B1BlockListService,
  B1BlockUtilsService,
  CheckBoxConfirmerService,
];

export {
  B1BlockHooksService,
  B1BlockListService,
  B1BlockUtilsService,
  CheckBoxConfirmerService,
};
