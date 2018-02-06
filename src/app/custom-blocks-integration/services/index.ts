import { CustomBlockListService } from "./list.service";
import { CustomBlockHooksService } from "./hooks.service";
import { CustomBlockUtilsService } from "./utils.service";

export const SERVICES = [
  CustomBlockHooksService,
  CustomBlockListService,
  CustomBlockUtilsService,
];

export {
  CustomBlockHooksService,
  CustomBlockListService,
  CustomBlockUtilsService,
};
