import { Injectable } from "@angular/core";

import { BlocksHooks } from "../../../models";

import { IBlockHooks } from "../../../tokens";

import { BlockHooksTriggerService } from "./blocks/block-hooks-trigger.service";

@Injectable()
export class BlockHooksService implements IBlockHooks {
  key: string;

  constructor(protected blockHooksTriggerService: BlockHooksTriggerService) {
    this.key = "base";
  }

  subscribeAll(hooks: BlocksHooks): void {
    this.blockHooksTriggerService.subscribeAll(hooks);
  }

  unsubscribeAll(): void {
    this.blockHooksTriggerService.unsubscribeAll();
  }

  getSetOfHooks(config: string): any {
    return {};
  }
}
