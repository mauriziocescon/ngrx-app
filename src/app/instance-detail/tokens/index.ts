import { InjectionToken } from "@angular/core";

import { IBlockHooks } from "./hooks";
import { IBlockUtils } from "./utils";
import { IBlockActions } from "./actions";

export { IBlockHooks };
export const BLOCK_HOOKS_TOKEN = new InjectionToken<IBlockHooks>("BlocksHooksService");

export { IBlockUtils };
export const BLOCK_UTILS_TOKEN = new InjectionToken<IBlockUtils>("BlocksUtilsService");

export { IBlockActions };
export const BLOCK_ACTIONS_TOKEN = new InjectionToken<IBlockActions>("BlockActionsService");
