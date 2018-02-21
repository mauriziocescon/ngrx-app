import { InjectionToken } from "@angular/core";

import { IBlockHooks } from "./hooks";
import { IBlockUtils } from "./utils";

export { IBlockHooks };
export const BLOCK_HOOKS_TOKEN = new InjectionToken<IBlockHooks>("BlocksHooksService");

export { IBlockUtils };
export const BLOCK_UTILS_TOKEN = new InjectionToken<IBlockUtils>("BlocksUtilsService");
