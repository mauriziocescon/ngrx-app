import { B3BlockHooksService } from "./block-hooks.service";

import { BLOCK_HOOKS_TOKEN } from "../../instance-detail/instance-detail.module";

export const SERVICES = [
  {provide: BLOCK_HOOKS_TOKEN, useClass: B3BlockHooksService, multi: true},
];
