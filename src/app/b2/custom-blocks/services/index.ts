import { B2BlockListService } from "./list.service";
import { B2BlockHooksService } from "./hooks.service";
import { B2BlockUtilsService } from "./utils.service";

import { CheckBoxConfirmerService } from "./blocks/check-box-confirmer.service";

export const SERVICES = [
  B2BlockHooksService,
  B2BlockListService,
  B2BlockUtilsService,
  CheckBoxConfirmerService,
];

export {
  B2BlockHooksService,
  B2BlockListService,
  B2BlockUtilsService,
  CheckBoxConfirmerService,
};
