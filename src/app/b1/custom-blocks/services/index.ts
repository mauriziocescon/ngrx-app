import { B1BlockHooksService } from "./hooks.service";
import { B1BlockUtilsService } from "./utils.service";

import { CheckBoxConfirmerActionsService } from "./blocks/check-box-confirmer-actions.service";

export const SERVICES = [
  B1BlockHooksService,
  B1BlockUtilsService,
  CheckBoxConfirmerActionsService,
];

export {
  B1BlockHooksService,
  B1BlockUtilsService,
  CheckBoxConfirmerActionsService,
};
