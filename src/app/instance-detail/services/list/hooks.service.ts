import { Injectable } from "@angular/core";

import { BlocksHooks } from "../../models";

import { BlockHooksTriggerService } from "./blocks/block-hooks-trigger.service";

@Injectable()
export class BlockHooksService {
  protected hooks: BlocksHooks;
  protected module: string;
  protected step: string;

  constructor(protected blockHooksTriggerService: BlockHooksTriggerService) {
  }

  setupHooks(hooks: BlocksHooks, module?: string, step?: string): void {
    this.blockHooksTriggerService.unsubscribeAll();

    this.hooks = hooks;
    this.module = module;
    this.step = step;

    this.blockHooksTriggerService.subscribeAll(this.hooks);
  }

  getSetOfRules(module: string, name: string): any {
    return {};
  }

  unsubscribeAll(): void {
    this.blockHooksTriggerService.unsubscribeAll();
  }
}
