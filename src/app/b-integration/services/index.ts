import { CustomBlockHooksService } from "./hooks.service";
import { CustomBlockUtilsService } from "./utils.service";

import { CustomBlocksActionsService } from "./blocks/block-actions.service";

export const SERVICES = [
  CustomBlockHooksService,
  CustomBlockUtilsService,
  CustomBlocksActionsService,
];

export {
  CustomBlockHooksService,
  CustomBlockUtilsService,
  CustomBlocksActionsService,
};
