import { CustomBlockHooksService } from "./hooks.service";
import { CustomBlockRulesService } from "./rules.service";
import { CustomBlockUtilsService } from "./utils.service";

import { CheckBoxConfirmerService } from "./blocks/check-box-confirmer.service";

export const SERVICES = [
  CustomBlockHooksService,
  CustomBlockRulesService,
  CustomBlockUtilsService,
  CheckBoxConfirmerService,
];

export {
  CustomBlockHooksService,
  CustomBlockRulesService,
  CustomBlockUtilsService,
  CheckBoxConfirmerService,
};
