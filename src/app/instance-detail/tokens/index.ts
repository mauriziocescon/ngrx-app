import { InjectionToken } from "@angular/core";

import { IBlockHooks } from "./hooks";

export { IBlockHooks };
export const BLOCK_HOOKS_TOKEN = new InjectionToken<IBlockHooks>("BlocksHooksService");

export const BLOCK_UTILS_TOKEN = new InjectionToken<any>("BlocksUtilsService");
